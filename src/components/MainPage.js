import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainPage = () => {
  return (
    <div className="MainPage">
      <Header/>
      <Link to="/posts">View posts</Link>
      <Link to="/create-post">Create post</Link>
      <Footer/>
    </div>
  );
}

export default MainPage;