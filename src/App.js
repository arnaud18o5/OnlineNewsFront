import './App.css';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';
import UserInformations from './UserInformations.js';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  if(!cookies.token){
    return (
      <div className="App">
        <LoginForm></LoginForm>
        <RegisterForm></RegisterForm>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <h1>Welcome {cookies.username}</h1>
        <button onClick={() => {removeCookies('username'); removeCookies('token'); removeCookies('description'); removeCookies('lastName'); removeCookies('firstName');}}>Sign-out</button>
        <UserInformations></UserInformations>
      </div>
    );
  }
}

export default App;
