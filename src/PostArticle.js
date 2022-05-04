import {useCookies} from 'react-cookie';
import {useState, useEffect} from 'react';
import FileInput from './FileInput.js';
import MDEditor from '@uiw/react-md-editor';
import ListPictureContent from './ListPictureContent.js';
import HeadPicture from './HeadPicture.js';

const PostArticle = (props) => {
    const [cookies, setCookies, removeCookies] = useCookies();
    const [isPosted, setIsPosted] = useState("No");
    const [error, setError] = useState(null);
    const [topics, setTopics] = useState(null);
    const [areTopicsLoading, setAreTopicsLoading] = useState(true);
    const [headPicture, setHeadPicture] = useState(null);
    const [text, setText] = useState('');
    const [pictureContent, setPictureContent] = useState([]);
    const [picCounter, setPicCounter] = useState(0);

    const loadTopics = async () => {
        try {
            const query = `query GetAllArticles {
                getAllTopics {
                  id
                  name
                }
              }`;
        
            const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                query
                })
            });
            const tpc = await response.json();
            setTopics(tpc.data.getAllTopics);
            //console.log(tpc);
        } catch (e) {
            setError(e);
        } finally {
            setAreTopicsLoading(false);
        }
    }
    
    useEffect(()=>{
        loadTopics();
        //console.log(pictureContent);
    }, []);

    useEffect(() => {
        //console.log("headpicture"+headPicture);
    }, headPicture);

    useEffect(() => {
        //console.log(pictureContent);
        setPicCounter(picCounter+1);
    }, [JSON.stringify(pictureContent)]);

    const submit = async (event) => {
        try {
            event.preventDefault();
        //console.log(event.target.articleTitle.value);
        //console.log(text);
        //console.log(event.target.topics.value);
        const query = `mutation Mutation($title: String!, $text: String!, $topics: [ID], $headPicture: String) {
            postArticle(title: $title, text: $text, topics: $topics, headPicture: $headPicture) {
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
          const title = event.target.articleTitle.value;
          const topic = event.target.topics.value;
          const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookies.token
            },
            body: JSON.stringify({
            query,
            variables: { title: title, text: text, topics: [topic], headPicture},
            })
        });
        const article = await response.json();
        event.target.articleTitle.value = "";
        event.target.articleText.value = "";
        props.changeState("Article");
        props.article(article.data.postArticle._id);
        } catch (error) {
            //console.log(error);
            props.changeState("errorPostArticle");
        }
        event.preventDefault();
    }

    if(error){
        return "Not able to post the article.";
    }
    if(isPosted === "No" && !areTopicsLoading){ // form for the article
        return (
            <div id="postArticle" class="pt-5">
                <h3 class="d-flex justify-content-center">Post a new article : </h3>
                <form onSubmit={submit}>
                    <div class="d-flex justify-content-center padding">
                        Enter a title for your article :     
                        <input type="text" id="articleTitle" placeholder="Title of the article"></input>
                    </div>
                    <div class="d-flex justify-content-center padding">
                    <label for="topics">Choose a topic:</label>
                    <select name="topics" id="topics">
                        {topics.map((topic) => {
                            //console.log(topic);
                            return <option value={topic.id}>{topic.name}</option>
                        })}
                    </select>
                    </div>
                    <div id="headPictureForm" class="d-flex justify-content-center padding">
                        Choose the main picture of your article :
                        <FileInput type="headPicture" setP={setHeadPicture}></FileInput>
                    </div>
                    <div class="d-flex justify-content-center padding">
                        <HeadPicture key="headPicture" hp={headPicture}></HeadPicture>
                    </div>
                        <div class="d-flex justify-content-center padding">
                        Add pictures for your article :
                            <FileInput type="content" source={pictureContent} setCounter={setPicCounter} counter={picCounter} setP={setPictureContent}></FileInput>
                        </div>
                        <div class="d-flex justify-content-center padding">
                            <ListPictureContent key={picCounter} pictures={pictureContent}></ListPictureContent>
                        </div>
                    <MDEditor
                        value={text}
                        onChange={setText}
                    />
                    <button type="submit" class="btn btn-primary">Post article</button>
                </form>
            </div>
        )
    }
    else {
        return "Loading...";
    }
}

export default PostArticle;