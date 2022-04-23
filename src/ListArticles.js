import {useCookies} from 'react-cookie';
import {useEffect, useState, useMountEffect} from 'react';



const ListArticles = () => {
    const [cookies, setCookies] = useCookies();
    const [articles, setArticles] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    const f = async () => {
        try{
            const query = `query Query($getAllArticlesOfId: ID!) {
                getAllArticlesOf(id: $getAllArticlesOfId) {
                    id
                    author
                    title
                    date
                }
                }`;
            const response = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                query,
                variables: { getAllArticlesOfId: cookies.id },
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
        <h3>My articles :</h3>
        <ul>
            {articles.data.getAllArticlesOf.map((a)=>{return <li key={a.title}><a href="#">{a.title}</a></li>})}
        </ul>
    </div>
    );
}

export default ListArticles;