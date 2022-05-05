import {useState, useEffect} from 'react';

const News = (props) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadNews = async () => {
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e0d997436f7048ba92be5cfc2c4f0fc4`;
            const res = await fetch(url, {
                method:'GET'
            });
            const response = await res.json();
            setNews(response.articles.splice(0,5));
        } catch (error) {
            setError(error);
        } finally {
           setLoading(false); 
        }
        
    }

    useEffect(() => {
        loadNews();
    }, []);

    if(loading){
        return (
            <div>
                <p>Loading ...</p>
            </div>
        )
    }

    return (
        <ul class="nav justify-content-center p-5 bg-info">
            {news.map((n) => {
                return(
                    <li class="nav-item   border-end border-dark" style={{width: "17%"}}>
                        <p class="fs-6">{n.title}</p>
                        <p class="fs-6">{n.publishedAt.substring(0, 10)}</p>
                        <a class="fs-6" href={n.url}>Url</a>
                    </li>
                )
                
            })}
        </ul>
    )
}

export default News;