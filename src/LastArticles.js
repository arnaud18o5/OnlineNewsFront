import {useState, useEffect} from 'react';


const LastArticles = () => {
    const [articles, setArticles] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    const f = async () => {
        try{
            const query = `query Query($number: Int) {
                getLastArticles(number: $number) {
                  id
                  author {
                    id
                    username
                    firstName
                    lastName
                    avatar
                  }
                  headPicture
                  title
                  text
                  date
                  topics {
                    id
                    name
                  }
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
                  dislikes {
                    usr {
                      _id
                      username
                      firstName
                      lastName
                      avatar
                    }
                  }
                }
              }`;
            const response = await fetch('http://localhost:4000/graphql', {
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
    return (loading ? "Loading..." : 
    <div id='listArticles'>
        <h3>Last articles :</h3>
        <ul class="d-inline">
            {articles.data.getLastArticles.map((a)=>{
                return (
                    <li key={a.title}>
                        <div class="card" style={{width: '18rem'}}>
                            <img src={a.headPicture} class="card-img-top" alt="..."></img>
                            <div class="card-body">
                                <h5 class="card-title">{a.title}</h5>
                                <a href="#" class="btn btn-primary">{a.author.username}</a>
                            </div>
                        </div>
                  </li>
                )})}
        </ul>
    </div>
    );
}

export default LastArticles;