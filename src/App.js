import './App.css';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';
import UserInformations from './UserInformations.js';
//import ListArticles from './ListArticles.js';
import PostArticle from './PostArticle.js';
import { useCookies } from 'react-cookie';
import ListArticles from './ListArticles';
import FileInput from './FileInput.js';
import Marked from './Marked.js';
import NavBar from './NavBar.js';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import {useState, useEffect} from 'react';

const client = new ApolloClient({
  link: createUploadLink({
    uri:'https://onlinenews.azurewebsites.net/graphql'
  }),
  cache: new InMemoryCache(),
})


const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const [state, setState] = useState("Start");

  useEffect(() => {
    if(cookies.token){
      setState("HPLogged");
    }
    else{
      setState("HP");
    }
  }, [])
  

  if(state === "HP"){

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <NavBar changeState={setState}></NavBar>
        </div>
      </ApolloProvider>
    );
  }
  else {
    console.log("token");
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <NavBar changeState={setState}></NavBar>
        <ListArticles request="getBestArticles" name="Best Articles"></ListArticles>
        <ListArticles request="getLastArticles" name="Latest Articles"></ListArticles>
        <h1>Welcome {cookies.username}</h1>
        <button class="btn btn-primary"onClick={() => {removeCookies('username'); removeCookies('token'); removeCookies('description'); removeCookies('lastName'); removeCookies('firstName');}}>Sign-out</button>
        <UserInformations></UserInformations>
        <PostArticle></PostArticle>
        <FileInput></FileInput>
        <Marked></Marked>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
