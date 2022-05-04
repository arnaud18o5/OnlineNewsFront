import {useCookies} from 'react-cookie';
import {useState, useEffect} from 'react';
import FileInput from './FileInput.js';

const UserInfo = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [info, setInfo] = useState({name:props.name, value:props.value});
    const [loading, setLoading] = useState(false);
    const [cookies, setCookies, removeCookies] = useCookies();
    const [error, setError] = useState(null);

    const edit = () => {
        setIsEditing(!isEditing);
    }

    const updateInfo = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const query = `mutation Mutation($${props.type}: String) {
                addUserInfo(${props.type}: $${props.type}) {
                    ${props.type}
                }
              }`;
              const res = await fetch('https://onlinenews.azurewebsites.net/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.token,
                },
                body: JSON.stringify({
                query,
                variables: JSON.parse('{ "' + props.type + '" : "' + event.target[0].value + '"}'),
                })
            });
            const response = await res.json();
            //console.log(response);
            setCookies(props.type, response.data.addUserInfo[props.type]);
            setInfo({name: props.type, value: response.data.addUserInfo[props.type]})
            //let p = profile;
            //p[props.type] = response.data.addUserInfo[props.type];
            //console.log(props.type);
            //setProfile(p);
        } catch (error) {
            //console.log("error");
            setError(error);
        }
        finally {
            setIsEditing(false);
            setLoading(false);
        }
        
    }


    useEffect(() => {
        setInfo({name: props.name, value: props.value});
    }, [])

    if(props.editing){
        
        if(isEditing){
            return (
                <div class="user-info">
                    <p>{info.name} : {info.value}</p>
                    <form onSubmit={updateInfo}>
                        <input type="text" id={props.type} placeholder={"New "+info.name}></input>
                        <input type="submit" value="Update"></input>
                    </form>
                </div>
            )
        }
        else {
            return (props.name === 'Avatar' ? 
                <div class="user-info">
                    <p>Avatar : </p>
                    <img src={"https://onlinenews.azurewebsites.net/images/"+info.value} width="100" height="100"/>
                    <FileInput type="avatar" change={setInfo}></FileInput>
                </div>
            : 
                <div class="user-info">
                    <p>{info.name} : {info.value}</p>
                    <button onClick={edit}>Edit</button>
                </div>
            )
        }
    }
    else{
        return (
            <div class="user-info">
                <p>{info.name} : {info.value}</p>
            </div>
        )
    }
};

export default UserInfo;