import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Footer from "./Footer";
import Header from "./Header";
import '../styles/Posts.css'

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://powerful-depths-39238.herokuapp.com/api/post', {mode:'cors'});
      const posts = await response.json();
  
      setPosts(posts);
    }
    fetchPosts();
  },[])

  const [postToUpdate, setPostToUpdate] = useState(false)
  useEffect(() => {
    if(postToUpdate) {
      const updatePostsByApi = async () => {
        await fetch(`https://powerful-depths-39238.herokuapp.com/api/post/${postToUpdate.id}`, {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.accessToken
          },
          body: JSON.stringify({ isPublished:postToUpdate.isPublished }
          )
        });
      }
      updatePostsByApi();
    }  
  }, [postToUpdate]);

  const handlePublish = (e) => {
    const newPosts = posts.map(post => {
      if(post._id === e.target.value){
        // Set state in map to get value for post's isPublished property.
        setPostToUpdate({ id: e.target.value, isPublished: !post.isPublished });
        return { ...post, isPublished: !post.isPublished };
      }

      return post;
    });

    setPosts(newPosts);
  }

  return (
    <div className="Posts">
      <Header/>
      <section className="posts-content">
        <h1 className="posts-title">Posts</h1>
        {posts.map(post => {
          return(
            <div className="post-link-container" key={post._id}>
              <Link className="post-link"  to={'/posts/' + post._id}>
                <h2>{post.title}</h2>
                <p>{post.isPublished && 'Published'}</p>
                <p>{!post.isPublished && 'Unpublished'}</p>
              </Link>
              <button className="publish-btn" value={post._id} onClick={handlePublish}>Publish/Unpublish</button>
            </div>
          )
        })}
      </section>
      <Footer/>
    </div>
  );
}

export default Posts;