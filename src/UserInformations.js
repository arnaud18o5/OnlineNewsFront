import {useCookies} from 'react-cookie';
import UserInfo from './UserInfo.js';

const UserInformations = () => {
    const [cookies, setCookies, removeCookies] = useCookies();

    return (
        <div id="userInformations">
            <ul>
                <li>
                    <UserInfo name="Username" type="username" value={cookies.username} editing={false}></UserInfo>
                </li>
                <li>
                    <UserInfo name="Avatar" type="image" value={cookies.avatar} editing={true}></UserInfo>
                </li>
                <li>
                    <UserInfo name="First Name" type="firstName" value={cookies.firstName} editing={true}></UserInfo>
                </li>
                <li>
                    <UserInfo name="Last Name" type="lastName" value={cookies.lastName} editing={true}></UserInfo>
                </li>
                <li>
                    <UserInfo name="Description" type="description" value={cookies.description} editing={true}></UserInfo>
                </li>
            </ul>
        </div>
    )
}

export default UserInformations;