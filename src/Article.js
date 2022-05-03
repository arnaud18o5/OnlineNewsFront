import {useState, useEffect} from 'react';
import MDEditor from '@uiw/react-md-editor';

const Article = (props) => {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getArticle = async () => {
    console.log("loading article");
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
            author
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
              username
              _id
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

      const article = await response.json();
      setArticle(article.data.getArticleById);
    } catch(error){
      setError(error);
    }
    finally {
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
  else if(error){
    return (
      <p>Error with loading article</p>
    )
  }
  console.log(article);
  return (
    <div id="back-Article">
      <div class="Article">
        <h1>{article.title}</h1>
        <h4>{article.date}</h4>
        <ul>
          {article.topics.map((topic) => {
            console.log(topic.name);
            return <li key={topic.name}>{topic.name}</li>
          })}
        </ul>
        <img src={"https://onlinenews.azurewebsites.net/images/"+article.headPicture} style={{margin: "auto"}}></img>
        <MDEditor.Markdown 
          source={article.text} 
          style={{margin: "5% 0 0 0"}}
        />
      </div>
      <div class="author-div Article">
        <img src={article.author.avatar}></img>
        <p>{article.author.username}</p>
      </div>
    </div>
  )
}

export default Article;