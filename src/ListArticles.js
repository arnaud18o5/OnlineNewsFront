import {useState, useEffect} from 'react';


const LastArticles = (props) => {
    const [articles, setArticles] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    const f = async () => {
        try{
          if(!props.topic)
          {
            const query = `query Query($number: Int) {
                ${props.request}(number: $number) {
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
                  dislikes{
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
                variables: { number: 10 },
                })
            });
            const articles = await response.json();
            setArticles(articles);
          }
          else{
            const query = `query Query($topicId: ID!) {
              getArticleByTopic(topicID: $topicId) {
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
                dislikes{
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
              variables: { topicId: props.topic },
              })
          });
          const articles = await response.json();
            setArticles(articles);
          }
            
        } catch (e){
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        f();
    }, [])

    if(error) return "Failed to load articles.";
    return (loading ?  
    <div>
      <h3 style={{padding: "10px 0 10px 20px"}}>{props.name}:</h3>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    : 
    <div id='listArticles'>
        <h3 style={{padding: "10px 0 10px 20px"}}>{props.name}:</h3>
        <ul class="list-inline media-scroller snaps-inline z-card">
            {articles.data[props.request].map((a)=>{
                return (
                    <li key={a.title} class="list-inline-item media-element card z-card">
                            <img class="z-card" src={"https://onlinenews.azurewebsites.net/images/"+a.headPicture} class="card-img-top" alt="..."></img>
                            <div class="card-body z-card" >
                              <p>{a.date}</p>
                                <h5 class="card-title z-card">{a.title}</h5>
                                {a.topics.map((topic) => {
                                  console.log(topic.name);
                                })}
                                <div class="inline z-card">
                                  <a href="#" class="">{a.author.username}</a>
                                </div>
                              <div class="progress z-card">
                                <div class="progress-bar bg-success z-card" role="progressbar" style={{width: (parseInt(a.likeCounter)*100/(parseInt(a.likeCounter)+parseInt(a.dislikeCounter))).toString()+"%"}} aria-valuenow={(parseInt(a.likeCounter)*100/(parseInt(a.likeCounter)+parseInt(a.dislikeCounter))).toString()} aria-valuemin="0" aria-valuemax="100">{a.likeCounter} {a.likeCounter > 1 ? "likes" : "like"}</div>
                                <div class="progress-bar bg-danger z-card" role="progressbar" style={{width: (parseInt(a.dislikeCounter)*100/(parseInt(a.likeCounter)+parseInt(a.dislikeCounter))).toString()+"%"}} aria-valuenow={(parseInt(a.dislikeCounter)*100/(parseInt(a.likeCounter+a.dislikeCounter))).toString()} aria-valuemin="0" aria-valuemax="100">{a.dislikeCounter} {a.dislikeCounter > 1 ? "dislikes" : "dislike"}</div>
                              </div>
                              <a href="#" onClick={() => props.changeState(a.id)}class="stretched-link">Go to the article</a>
                            </div>
                  </li>
                )})}
        </ul>
    </div>
    );
}

export default LastArticles;