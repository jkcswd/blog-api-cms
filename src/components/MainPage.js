import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import '../styles/MainPage.css'

const MainPage = () => {
  return (
    <div className="MainPage">
      <Header/>
      <div className="main-page-content">
        <Link to="/posts">
          <div className="link-container">View posts</div>
        </Link>
        <Link to="/create-post">
          <div className="link-container">Create post</div>
        </Link>
      </div>
      <Footer/>
    </div>
  );
}

export default MainPage;