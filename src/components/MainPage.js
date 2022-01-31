import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="MainPage">
      <h1>You are in!</h1>
      <Link to="/posts">View posts</Link>
      <Link to="/create-post">Create post</Link>
    </div>
  );
}

export default MainPage;