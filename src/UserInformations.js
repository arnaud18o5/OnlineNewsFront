import {useCookies} from 'react-cookie';
import {useState, useEffect} from 'react';
import UserInfo from './UserInfo.js';

const UserInformations = (props) => {
    const [cookies, setCookies, removeCookies] = useCookies();
    const [profile, setProfile] = useState(props.profile);

    useEffect(() => {
        setProfile(props.profile)
    }, []);

    return (
        <div id="userInformations">
            <ul>
                <li>
                    <UserInfo name="Username" type="username" value={profile.username} editing={false}></UserInfo>
                </li>
                <li>
                    <UserInfo name="Avatar" type="image" value={profile.avatar} editing={true}></UserInfo>
                </li>
                <li>
                    <UserInfo name="First Name" type="firstName" value={profile.firstName} editing={true}></UserInfo>
                </li>
                <li>
                    <UserInfo name="Last Name" type="lastName" value={profile.lastName} editing={true}></UserInfo>
                </li>
                <li>
                    <UserInfo name="Description" type="description" value={profile.description} editing={true}></UserInfo>
                </li>
            </ul>
        </div>
    )
}

export default UserInformations;