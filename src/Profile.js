import {useState, useEffect} from 'react';
import {Cookies, useCookies} from 'react-cookie';
import UserInformations from './UserInformations.js';

const Profile = (props) => {
    const [profile, setProfile] = useState(null);
    const [id, setId] = useState(props.id);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMe, setIsMe] = useState(false);
    const [cookies, setCookies] = useCookies();

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
              console.log(id);
              const p = await response.json();
              setProfile(p.data.user);

        } catch (error) {
            console.log('error');
            setError(error);
        } finally {
            setLoading(false);
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

    if(loading)
        return ('loading');
    console.log(profile);
    if(isMe){
        return(
        <UserInformations profile={profile}></UserInformations>
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
            </div>
        )
    }
}

export default Profile;
