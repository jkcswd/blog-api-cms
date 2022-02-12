import { useEffect, useState } from "react";
import Footer from "./Footer";
import '../styles/Login.css'

const Login = () => {
  const [loginDetails, setLoginDetails] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=> {
    const getJWT = async () =>{
      if(loginDetails) {
        const response = await fetch('https://powerful-depths-39238.herokuapp.com/api/auth/', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginDetails)
        });
        const tokenData = await response.json()

        if(tokenData.token) {
          localStorage.setItem('accessToken', tokenData.token);
          localStorage.setItem('userDetails', JSON.stringify(tokenData.user));
          window.location.reload()
        }else {
          alert('Incorrect login details.')
        }
      }
    }
    getJWT();
  }, [loginDetails])

  const handleUserChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginDetails({
      username,
      password
    })

    setUsername('');
    setPassword('');
  }

  return (
    <div className="Login">
      <div className="login-content">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="user">User: </label>
          <input type="text" value={username} id="user" onChange={handleUserChange}/>
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} id="password" onChange={handlePasswordChange}/>
          <input className="button" type="submit" value="Login"/>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;