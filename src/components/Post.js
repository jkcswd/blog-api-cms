import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const Post = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const [post, setPost] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:8000/api/post/${id}`, {mode:'cors'});
      const post = await response.json();
  
      setPost(post);
    }
    fetchPost();

    const fetchComments = async () => {
      const response = await fetch(`http://localhost:8000/api/post/${id}/comments`, {mode:'cors'});
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
        await fetch(`http://localhost:8000/api/comment/${commentToDelete}`, {
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
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p>{post.isPublished && 'PUBLISHED'}</p>
      <p>{!post.isPublished && 'UNPUBLISHED'}</p>
      <h2>Comments</h2>
      {comments.map(comment => {
        return(
          <div key={comment._id}>
            <p>{comment.comment}</p>
            <p>{comment.user.username}</p>
            <p>{comment.datePublished}</p>
            <button value={comment._id} onClick={deleteComment}>Delete</button>
          </div>
        )
      })
      }
    </div>
  );
}

export default Post;