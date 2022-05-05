import './App.css';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';
import UserInformations from './UserInformations.js';
import PostArticle from './PostArticle.js';
import { useCookies } from 'react-cookie';
import ListArticles from './ListArticles';
import FileInput from './FileInput.js';
import Article from './Article.js';
import NavBar from './NavBar.js';
import Profile from './Profile.js';
import News from './News.js';
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
  const [state, setState] = useState(localStorage.getItem('state'));
  const [article, setArticle] = useState('');
  const [link, setLink] = useState(localStorage.getItem('link'));

  const selectArticle = (id) => {
    //console.log(id);
    setLink(id);
    setState('article');
  }

  useEffect(() => {
    if(!state){
      if(cookies.token){
        setState("HPLogged");
      }
      else{
        setState("HP");
      }
    } 
    if(state === "HPLogged"){
      if(cookies.token){
        setState("HPLogged");
      }
      else{
        setState("HP");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('state', state);
    localStorage.setItem('link', link);
  }, [state, link]);
  
console.log(state);
console.log(link);
  if(state === "HP"){
//console.log('hp');
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <NavBar changeState={setState} changeLink={setLink}></NavBar>
        </div>
      </ApolloProvider>
    );
  }
  if(state === "newArticle" && article !== null){
    //console.log('newArticle');
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <NavBar changeState={setState} changeLink={setLink}></NavBar>
        <PostArticle changeState={selectArticle}></PostArticle>
      </div>
      </ApolloProvider>
    );
  }
  if(state==="HPLogged"){
    //console.log('hpLogged')
    return(
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar changeState={setState} changeLink={setLink}></NavBar>
        <News></News>
        <ListArticles request="getSubscriptionsArticle" name="Articles of the users you follow" changeState={selectArticle}></ListArticles>
        <ListArticles request="getBestArticles" name="Best Articles" changeState={selectArticle}></ListArticles>
        <ListArticles request="getLastArticles" name="Latest Articles" changeState={selectArticle}></ListArticles>
        <ListArticles request="getArticleByTopic" topic="627107a964de2a3179c43574" name="Economy" changeState={selectArticle}></ListArticles>
        <ListArticles request="getArticleByTopic" topic="626d1f2ec2510481ec06b498" name="Politic" changeState={selectArticle}></ListArticles>
        <ListArticles request="getArticleByTopic" topic="6271078f64de2a3179c4356c" name="Environment" changeState={selectArticle}></ListArticles>
        <ListArticles request="getArticleByTopic" topic="6271078364de2a3179c43567" name="Sport" changeState={selectArticle}></ListArticles>
        <ListArticles request="getArticleByTopic" topic="6271077864de2a3179c43562" name="Society" changeState={selectArticle}></ListArticles>
      </div>
      </ApolloProvider>)
  }
  if(state==="errorPostArticle"){
    //console.log('errorpostarticle')
    return (
      <div>
          <div class="alert alert-danger" role="alert">
              Problem with posting the article. Try Again.
          </div>
          <button class="btn btn-primary" onClick={setState("newArticle")}>Go back to article creation</button>
      </div>
  )
  }
  if(state === "article") {
    //console.log('article')
    return (
      <ApolloProvider client={client}>
      <div className="App">
      <NavBar changeState={setState} changeLink={setLink}></NavBar>
      <Article articleId={link} setState={setState} setLink={setLink}></Article>
      </div>
      </ApolloProvider>
    )
  }
  if(state === "profile"){
    //console.log('profile')
    return (
      <ApolloProvider client={client}>
      <div className="App">
      <NavBar changeState={setState} changeLink={setLink}></NavBar>
      <Profile id={link} setState={selectArticle} ></Profile>
      </div>
      </ApolloProvider>
    )
  }
  else{
    return (
      <ApolloProvider client={client}>
      <div className="App">
      <NavBar changeState={setState} changeLink={setLink}></NavBar>
      <p>error</p>
      </div>
      </ApolloProvider>
    )
  }
}

export default App;
