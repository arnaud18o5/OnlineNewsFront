import {useState, useEffect} from 'react';
import MDEditor from '@uiw/react-md-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import {useCookies} from 'react-cookie'
import Comments from './Comments.js';

const Article = (props) => {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookies] = useCookies();
  const [likeCount, setLikeCount] = useState({like:0, dislike:0});
  const [isMine, setIsMine] = useState(false);

  const likeArticle = async (like) => {
    try {
      let query;
      if(like){
        query = `mutation Mutation($articleId: ID!) {
          like(articleID: $articleId) {
            likeCounter
            dislikeCounter
          }
        }`;
      }
      else {
        query = `mutation Mutation($articleId: ID!) {
          dislike(articleID: $articleId) {
            likeCounter
            dislikeCounter
          }
        }`
      }
      const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify({
        query,
        variables: { articleId: props.articleId },
        })
      });
      const newArticle = await response.json();
      //console.log(newArticle.data);
      if(like === true){
        setLikeCount({like:newArticle.data.like.likeCounter, dislike: newArticle.data.like.dislikeCounter});
      }
      else{
        setLikeCount({like:newArticle.data.dislike.likeCounter, dislike: newArticle.data.dislike.dislikeCounter});
      }
    } catch (error) {
      //console.log(error);
      setError(error);
    } finally {
    }
  }

  const getArticle = async () => {
    //console.log("loading article");
    try{
      const query = `query Query($articleId: ID!) {
        getArticleById(articleID: $articleId) {
          id
          author {
            id
            username
            token
            firstName
            lastName
            description
            avatar
            subscribers {
              id
              username
            }
            subscribingTo {
              id
              username
            }
          }
          headPicture
          title
          text
          date
          comments {
            id
            author{
              username
              id
            }
            text
            date
          }
          likes {
            usr {
              _id
              username
              firstName
              lastName
              avatar
            }
          }
          likeCounter
          dislikes {
            usr {
              _id
              username
              firstName
              lastName
              avatar
            }
          }
          dislikeCounter
          topics {
            id
            name
          }
        }
      }`;
      const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        query,
        variables: { articleId: props.articleId },
        })
      });
      //console.log(response);
      const Article = await response.json();
      //console.log(Article)
      setArticle(Article.data.getArticleById);
      setLikeCount({like:Article.data.getArticleById.likeCounter, dislike: Article.data.getArticleById.dislikeCounter});
      console.log(article);
      if(Article.data.getArticleById.author.id===cookies.id)
        setIsMine(true);
      else
        setIsMine(false);
    } catch(error){
      console.log(error);
      setError(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const removeArticle = async () => {
    setIsLoading(true);
    try {
      const query = `mutation Mutation($articleId: ID!) {
        removeArticle(articleID: $articleId) {
          message
        }
      }`;
      const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify({
        query,
        variables: { articleId: props.articleId },
        })
      });
      const message = await response.json();
      if(!message.errors){
        props.setState("HPLogged");
      }
      console.log(message);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getArticle();
  }, []);


  if(isLoading){
    return (
      <div>
        <h3>Article is loading</h3>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  if(error){
    return (
      <p>Error with loading article</p>
      )
    }
    //console.log(article);
    return (
      <div id="back-Article">
        <div class="Article">
          <div>
            <h1>{article.title}</h1>
            <h4>{article.date}</h4>
            <ul>
              {article.topics.map((topic) => {
                //console.log(topic.name);
                return <li key={topic.name}>{topic.name}</li>
              })}
            </ul>
          </div>
          {isMine ? <button class="btn btn-danger btn-sm" onClick={removeArticle}>Delete this article</button> : <></>}
          <img src={"https://onlinenews.azurewebsites.net/images/"+article.headPicture} style={{margin: "auto"}}></img>
          <MDEditor.Markdown 
            source={article.text} 
            style={{margin: "5% 0 0 0"}}
          />
        </div>
        <div class="Article"id="likeButtons">
            <button class="btn btn-success" onClick={() => likeArticle(true)}><FontAwesomeIcon icon={faThumbsUp} /></button>
            <button class="btn btn-warning" onClick={() => likeArticle(false)}><FontAwesomeIcon icon={faThumbsDown} /></button>
            <div class="progress" style={{width:"30%"}}>
              <div class="progress-bar bg-success " role="progressbar" style={{width: (parseInt(likeCount.like)*100/(parseInt(likeCount.like)+parseInt(likeCount.dislike))).toString()+"%"}} aria-valuenow={(parseInt(likeCount.like)*100/(parseInt(likeCount.like)+parseInt(likeCount.dislike))).toString()} aria-valuemin="0" aria-valuemax="100">{likeCount.like} {likeCount.like > 1 ? "likes" : "like"}</div>
              <div class="progress-bar bg-danger " role="progressbar" style={{width: (parseInt(likeCount.dislike)*100/(parseInt(likeCount.like)+parseInt(likeCount.dislike))).toString()+"%"}} aria-valuenow={(parseInt(likeCount.dislike)*100/(parseInt(likeCount.like+likeCount.dislike))).toString()} aria-valuemin="0" aria-valuemax="100">{likeCount.dislike} {likeCount.dislike > 1 ? "dislikes" : "dislike"}</div>
            </div>
        </div>
        <Comments comments={article.comments} articleId={props.articleId} setState={props.setState} setLink={props.setLink}></Comments>
        <div class="author-div Article ">
          <div class="d-inline-flex justify-content-evenly">
            <img src={"https://onlinenews.azurewebsites.net/images/"+article.author.avatar} style={{width: "10%"}}></img>
            <div>
              <button onClick={() => {props.setState("profile"); props.setLink(article.author.id)}} class="btn btn-link btn-lg">{article.author.username}</button>
              <p>{article.author.firstName} {article.author.lastName}</p>
            </div>
            <p>{article.author.description}</p>
          </div>
        </div>
      </div>
    )
  
    
}

export default Article;