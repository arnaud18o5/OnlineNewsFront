import {useState, useEffect} from 'react';
import {Cookies, useCookies} from 'react-cookie';
import UserInformations from './UserInformations.js';
import ListArticles from './ListArticles.js';

const Profile = (props) => {
    const [profile, setProfile] = useState(null);
    const [id, setId] = useState(props.id);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMe, setIsMe] = useState(false);
    const [cookies, setCookies] = useCookies();
    const [subscribers, setSubscribers] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const loadProfile = async () => {
        try {
            const query = `query Query($userId: ID!) {
                user(id: $userId) {
                  id
                  username
                  firstName
                  lastName
                  description
                  avatar
                  subscribers {
                    id
                    username
                  }
                  subscribingTo {
                    id
                    username
                  }
                }
              }`;

              const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                query,
                variables: { userId: id },
                })
              });
              //console.log(id);
              const p = await response.json();
              if(p.errors){
                  console.log(p.errors);
                  setError(p.errors);
              }
              console.log(p);
              setProfile(p.data.user);
              setSubscribers(p.data.user.subscribers.length);
              if(p.data.user.subscribers.find((sub) => {return sub.id === cookies.id})){
                setIsSubscribed(true);
              }
              else{
                  setIsSubscribed(false);
              }
        } catch (error) {
            console.log('error');
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    

    const subscribe = async () => {
        try{
            const query = `mutation Mutation($userId: ID!) {
                subscribeToUser(userID: $userId) {
                  subscribers {
                    id
                    username
                  }
                }
              }`;
              const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.token}`
                    },
                    body: JSON.stringify({
                    query,
                    variables: { userId: id },
                    })
                  });
                const s = await response.json();
                if(s.errors){
                    setError(s.errors);
                }
                let p = profile;
                p.subscribers = s.data.subscribeToUser.subscribers;
                setProfile(p);
                setSubscribers(p.subscribers.length);
                if(s.data.subscribeToUser.subscribers.find((sub) => {return sub.id === cookies.id})){
                    setIsSubscribed(true);
                  }
                  else{
                    setIsSubscribed(false);
                  }
        }catch(error){
            setError(error);
        }
    }

    useEffect(() => {
        setId(props.id);
        loadProfile();
        if(id===cookies.id){
            setIsMe(true);
        }
        else{
            setIsMe(false);
        }
    }, []);

    console.log(error);
    if(loading)
        return ('loading');

    if(error){
        console.log(error);
        return 'error loading'
    }
    //console.log(profile);
    if(isMe){
        return(
            <div>
                <UserInformations profile={profile}></UserInformations>
                <ListArticles changeState={props.setState} request="getAllArticlesOf" name="Your articles" id={id}></ListArticles>
            </div>
        )
    }
    else {
        return(
            <div className="profile">
                <div class="container avatar">
                    <img src={"https://onlinenews.azurewebsites.net/images/"+profile.avatar} alt="avatar" />
                </div>
                <div class="container username">
                    Username : {profile.username}
                </div>
                <div class="container firstname">
                    First Name : {profile.firstName}
                </div>
                <div class="container lastName">
                    Last Name : {profile.lastName}
                </div>
                <div class="container description">
                    Last Name : {profile.description}
                </div>

                <div class="container subscribers">
                    Subscribers : {subscribers}
                </div>
                <div class="container subscribers">
                    subscription : {profile.subscribingTo.length}
                </div>
                <div class="container">
                    {isSubscribed ? <button class="btn btn-danger" onClick={subscribe}>Unsubscribe to {profile.username}</button> : <button class="btn btn-primary" onClick={subscribe}>Subscribe to {profile.username}</button>}
                    
                </div>
                <ListArticles changeState={props.setState} request="getAllArticlesOf"  name={"Articles of "+profile.username} id={id}></ListArticles>
            </div>
        )
    }
}

export default Profile;
