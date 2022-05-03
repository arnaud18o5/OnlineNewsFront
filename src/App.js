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
  const [article, setArticle] = useState('');

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
  if(state === "newArticle" && article !== null){
    console.log("token");
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <NavBar changeState={setState}></NavBar>
        <PostArticle changeState={setState} article={setArticle}></PostArticle>
      </div>
      </ApolloProvider>
    );
  }
  if(state==="HPLogged"){
    return(<ApolloProvider client={client}>
      <div className="App">
        <NavBar changeState={setState}></NavBar>
        <ListArticles request="getBestArticles" name="Best Articles"></ListArticles>
        <ListArticles request="getLastArticles" name="Latest Articles"></ListArticles>
        <ListArticles request="getArticleByTopic" topic="627107a964de2a3179c43574" name="Economy"></ListArticles>
        <ListArticles request="getArticleByTopic" topic="626d1f2ec2510481ec06b498" name="Politic"></ListArticles>
        <ListArticles request="getArticleByTopic" topic="6271078f64de2a3179c4356c" name="Environment"></ListArticles>
        <ListArticles request="getArticleByTopic" topic="6271078364de2a3179c43567" name="Sport"></ListArticles>
        <ListArticles request="getArticleByTopic" topic="6271077864de2a3179c43562" name="Society"></ListArticles>
      </div>
      </ApolloProvider>)
  }
  if(state==="errorPostArticle"){
    return (
      <div>
          <div class="alert alert-danger" role="alert">
              Problem with posting the article. Try Again.
          </div>
          <button class="btn btn-primary" onClick={setState("newArticle")}>Go back to article creation</button>
      </div>
  )
  }
}

export default App;
