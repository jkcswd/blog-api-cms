import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Footer from "./Footer";
import Header from "./Header";
import '../styles/Post.css'

const Post = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const [post, setPost] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://powerful-depths-39238.herokuapp.com/api/post/${id}`, {mode:'cors'});
      const post = await response.json();
  
      setPost(post);
    }
    fetchPost();

    const fetchComments = async () => {
      const response = await fetch(`https://powerful-depths-39238.herokuapp.com/api/post/${id}/comments`, {mode:'cors'});
      const comments = await response.json();
  
      setComments(comments);
    }
    fetchComments();
  // id variable not needed in dependency array for rerender
  // eslint-disable-next-line
  },[]);

  const [commentToDelete, setCommentToDelete] = useState(false);
  useEffect(() => {
    if(commentToDelete) {
      const sendDeleteToApi = async () => {
        await fetch(`https://powerful-depths-39238.herokuapp.com/api/comment/${commentToDelete}`, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.accessToken
          }
        });
      }
      sendDeleteToApi();
    }
  }, [commentToDelete]);

  const deleteComment = (e) => {
    setCommentToDelete(e.target.value);

    const newComments = comments.filter(comment => {
      return comment._id !== e.target.value
    });

    setComments(newComments)
  }

  return (
    <div className="Post">
      <Header/>
      <div className="post-content">
        <h1 className="post-title">{post.title}</h1>
        <p>{post.isPublished && '(PUBLISHED)'}</p>
        <p>{!post.isPublished && '(UNPUBLISHED)'}</p>
        <p>{post.text}</p>
        <div className="comments">
          <h2 className="comments-title">Comments</h2>
          {comments.map(comment => {
            return(
              <div className="comment" key={comment._id}>
                <p>{comment.comment}</p>
                <p>By: {comment.user.username} Date: {comment.datePublished}</p>
                <button className="button" value={comment._id} onClick={deleteComment}>Delete</button>
              </div>
            )
          })
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Post;