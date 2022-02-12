import { useEffect, useState } from "react/cjs/react.development";
import Footer from "./Footer";
import Header from "./Header";
import '../styles/CreatePost.css'

const CreatePost = () => {
  const user = JSON.parse(localStorage.userDetails)._id;

  const [postDetails, setPostDetails]= useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const sendPost = async () => {
      if(postDetails) {
        await fetch('http://localhost:8000/api/post/', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.accessToken
          },
          body: JSON.stringify(
            {
              title: postDetails.title,
              text: postDetails.text,
              user: JSON.parse(localStorage.userDetails)._id,
              isPublished: postDetails.isPublished
            }
          )
        });

        setTitle('');
        setText('');
        setIsPublished('');
      } 
    }
    sendPost();
  }, [postDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostDetails(
      {
        title,
        text,
        user,
        isPublished
      }
    )
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  
  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handlePublishedChange = (e) => {
    setIsPublished(e.target.checked)
  }


  return (
    <div className="CreatePost">
      <Header/>
      <form className="post-form" method="post" onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="title">Post Title: </label>
          <input type="text" value={title} name="title" onChange={handleTitleChange}/>
        </div>
        <div className="container">
          <label htmlFor="text">Post Text: </label>
          <textarea className="post-text" type="text" value={text} name="text" onChange={handleTextChange}/>
        </div>
        <div className="container">
          <label htmlFor="published">To be published?: </label>
          <input type="checkbox" value={isPublished} name="published" onChange={handlePublishedChange}/>
        </div>
        <input className="button" type="submit" value="Submit Post"/>
      </form>
      <Footer/>
    </div>
  );
}

export default CreatePost;