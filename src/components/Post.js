import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const Post = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2]
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:8000/api/post/${id}`, {mode:'cors'});
      const post = await response.json();
  
      setPost(post);
    }
    fetchPost();
  },[id]);

  return (
    <div className="Post">
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p>{post.isPublished && 'PUBLISHED'}</p>
      <p>{!post.isPublished && 'UNPUBLISHED'}</p>
    </div>
  );
}

export default Post;