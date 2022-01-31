import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:8000/api/post', {mode:'cors'});
      const posts = await response.json();
  
      setPosts(posts);
    }
    fetchPosts();
  },[])

  return (
    <div className="Posts">
      <h1>Posts</h1>
       {posts.map(post => {
         return(
            <Link key={post._id} to={'/posts/' + post._id}>
              <h2>{post.title}</h2>
              <p>{post.text}</p>
            </Link>
          )
       })}
    </div>
  );
}

export default Posts;