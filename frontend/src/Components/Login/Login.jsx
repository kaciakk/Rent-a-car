import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importuj axios

export default function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {email, password})
      .then(result => { console.log(result)
      if (result.data === "success") {
      navigate('/')
      }
    })
      .catch(err => console.log(err))
}
  return (

    <div className='login-container'>
      <div className='login-container-inside'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
           type="text" 
           name="email" 
           onChange={(e) => setEmail(e.target.value)}
           />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
          type="password" 
          name="password"
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        </form>
        <div>
          Don't have an account? <Link  to='/signup'>Create an account</Link>
        </div>
      </div>
    </div>
  );
}
