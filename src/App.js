import './App.css';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';
import UserInformations from './UserInformations.js';
//import ListArticles from './ListArticles.js';
import PostArticle from './PostArticle.js';
import { useCookies } from 'react-cookie';
import ListArticles from './ListArticles';

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
    console.log("token");
    return (
      <div className="App">
        <h1>Welcome {cookies.username}</h1>
        <button onClick={() => {removeCookies('username'); removeCookies('token'); removeCookies('description'); removeCookies('lastName'); removeCookies('firstName');}}>Sign-out</button>
        <UserInformations></UserInformations>
        <PostArticle></PostArticle>
        <ListArticles></ListArticles>
      </div>
    );
  }
}

export default App;
