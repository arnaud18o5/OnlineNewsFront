import {useCookies} from 'react-cookie';
import {useState} from 'react';


const PostArticle = () => {
    const [cookies, setCookies, removeCookies] = useCookies();

    const submit = async (event) => {
        event.preventDefault();
        const query = `mutation Mutation($title: String!, $text: String!) {
            postArticle(title: $title, text: $text) {
              id
              author
              title
              text
              date
            }
          }`;
          const title = event.target.articleTitle.value;
          const text = event.target.articleText.value;
          const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookies.token
            },
            body: JSON.stringify({
            query,
            variables: { title: title, text: text },
            })
        });
        const article = await response.json();
        event.target.articleTitle.value = "";
        event.target.articleText.value = "";
        if(!article.errors) {
            console.log(`article registered`);
        }
        console.log(article);
    }

    return (
        <div id="postArticle">
            <h3>Post a new article : </h3>
            <form onSubmit={submit}>
                <input type="text" id="articleTitle" placeholder="Title"></input>
                <input type="text" id="articleText" placeholder="Content"></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default PostArticle;