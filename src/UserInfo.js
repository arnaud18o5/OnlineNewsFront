import {useCookies} from 'react-cookie';
import {useState} from 'react';

const UserInfo = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cookies, setCookies, removeCookies] = useCookies();

    const edit = () => {
        setIsEditing(!isEditing);
    }

    const updateInfo = async (event) => {
        event.preventDefault();
        console.log('{ "' + props.type + '" : "' + event.target[0].value + '"}')
        console.log(JSON.parse('{ "' + props.type + '" : "' + event.target[0].value + '"}'));
        const query = `mutation Mutation($${props.type}: String) {
            addUserInfo(${props.type}: $${props.type}) {
                ${props.type}
            }
          }`;
          const res = await fetch('http://localhost:4000/graphql', {
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
        console.log(res);
        const response = await res.json();
        console.log(response);
        if(!response.errors) {
            console.log(response.data.addUserInfo[props.type]);
            setCookies(props.type, response.data.addUserInfo[props.type]);
        }
        else{
            console.log("add notification error");
        }
        setIsEditing(false);
    }

    if(props.editing){
        
        if(isEditing){
            return (
                <div class="user-info">
                    <p>{props.name} : {props.value}</p>
                    <form onSubmit={updateInfo}>
                        <input type="text" id={props.type} placeholder={"New "+props.name}></input>
                        <input type="submit" value="Update"></input>
                    </form>
                </div>
            )
        }
        else {
            return (props.name === 'Avatar' ? 
                <div class="user-info">
                    <p>Avatar : </p>
                    <img src={"http://localhost:4000/images/"+cookies.avatar}/>
                </div>
            : 
                <div class="user-info">
                    <p>{props.name} : {props.value}</p>
                    <button onClick={edit}>Edit</button>
                </div>
            )
        }
    }
    else{
        return (
            <div class="user-info">
                <p>{props.name} : {props.value}</p>
            </div>
        )
    }
};

export default UserInfo;