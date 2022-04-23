import './App.css';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';
import UserInformations from './UserInformations.js';
//import ListArticles from './ListArticles.js';
import PostArticle from './PostArticle.js';
import { useCookies } from 'react-cookie';
import ListArticles from './ListArticles';
import FileInput from './FileInput.js';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({
    uri:'http://localhost:4000/graphql'
  }),
  cache: new InMemoryCache(),
})


const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies();

  if(!cookies.token){
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <LoginForm></LoginForm>
          <RegisterForm></RegisterForm>
        </div>
      </ApolloProvider>
    );
  }
  else {
    console.log("token");
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <h1>Welcome {cookies.username}</h1>
        <button onClick={() => {removeCookies('username'); removeCookies('token'); removeCookies('description'); removeCookies('lastName'); removeCookies('firstName');}}>Sign-out</button>
        <UserInformations></UserInformations>
        <PostArticle></PostArticle>
        <ListArticles></ListArticles>
        <FileInput></FileInput>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
