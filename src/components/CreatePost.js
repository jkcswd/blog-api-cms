import { useEffect, useState } from "react/cjs/react.development";

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
      <form method="post" onSubmit={handleSubmit}>
        <input type="text" value={title} name="title" onChange={handleTitleChange}/>
        <input type="text" value={text} name="text" onChange={handleTextChange}/>
        <input type="checkbox" value={isPublished} name="published" onChange={handlePublishedChange}/>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default CreatePost;