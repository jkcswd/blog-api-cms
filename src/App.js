import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Post from "./components/Post";
import Posts from "./components/Posts";

const App = () => {
  const token = localStorage.getItem('accessToken');

  if(!token) {
    return <Login/>
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/posts" element={<Posts/>}/>
      <Route path="/create-post" element={<CreatePost/>}/>
      <Route path="/posts/:id" element={<Post/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
