import { useEffect, useState } from "react";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=> {
    const getJWT = async () =>{
      if(loginDetails) {
        const response = await fetch('http://localhost:8000/api/auth/', {
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
          console.error('Incorrect login details.')
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
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleUserChange}/>
        <input type="password" value={password} onChange={handlePasswordChange}/>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default Login;