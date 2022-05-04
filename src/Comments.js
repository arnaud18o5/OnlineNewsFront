import {useCookies} from 'react-cookie';
import {useState, useEffect} from 'react';


const Comments = (props) => {
    const [cookies, setCookies] = useCookies();
    const [comments, setComments] = useState(props.comments);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setComments(props.comments);
        console.log(comments);
    }, []);
    
    const submitComment = async (event) => {
        setLoading(true);
        try {
            const content = event.target.commentContent.value;
            const query = `mutation Mutation($articleId: ID!, $text: String!) {
                postComment(articleID: $articleId, text: $text) {
                  comments{
                      id
                      author{
                          username
                      }
                      text
                  }
                }
              }`
            const response = await fetch('https://onlinenews.azurewebsites.net/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
                },
                body: JSON.stringify({
                query,
                variables: { articleId:props.articleId ,text: content },
                })
              });
            const newComments = await response.json();
            console.log(newComments);
            setComments(newComments.data.postComment.comments);
        } catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const removeComment = async (id) => {
        setLoading(true);
        try {
            const query = `mutation Mutation($articleId: ID!, $commentId: ID!) {
                removeComment(articleID: $articleId, commentID: $commentId) {
                  id
                  comments {
                    id
                    text
                    author{
                        username
                    }
                  }
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
                variables: { articleId:props.articleId ,commentId: id },
                })
            });
            const newComments = await response.json();
            setComments(newComments.data.removeComment.comments);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    if(loading)
        return (
            <div class="comments Article">
                <h3>Comments :</h3>
            <ul>
            {comments.slice(0).reverse().map((comment) => {
                return <li key={comment.id}>
                    <a href="#" >{comment.author.username}</a>
                     : {comment.text}
                </li>
            })}
            </ul>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <form onSubmit={submitComment}>
                <input type="text" id="commentContent"/>
                <button type="submit" class="btn btn-primary">Comment</button>
            </form>
        </div>
        );
    
    console.log(comments);
    return (
        <div class="comments Article">
                <h3>Comments :</h3>
            <ul>
            {comments.slice(0).reverse().map((comment) => {
                return <li key={comment._id}>
                    <a href="#" >{comment.author.username}</a>
                     : {comment.text}
                    {comment.author.username === cookies.username ? <button class="btn btn-danger btn-sm ms-2" onClick={() => {removeComment(comment.id)}}>X</button> : <></>}
                </li>
            })}
            </ul>
            <form onSubmit={submitComment}>
                <input type="text" id="commentContent"/>
                <button type="submit" class="btn btn-primary">Comment</button>
            </form>
        </div>
    )
}

export default Comments;