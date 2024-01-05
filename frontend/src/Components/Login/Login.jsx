import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importuj axios


const LOGIN_URL ='http://localhost:3500/users/login';


export default function Login() {
  const {setAuth} = useContext(AuthContext);

  const emailRef = useRef();
  const errRef = useRef();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  },[]);

  useEffect(() => {
    setErrMsg('');
  },[email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3500/users/login', {
      email,
    password
}, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

  
        setEmail('');
        setPassword('');
        setSuccess(true);
        navigate('/')
        console.log('Zalogowano pomyślnie');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
}
  return (

    <section className='login-container'>
      <div className='login-container-inside'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
          name='email'
           type='text'
           id='email'
           ref={emailRef}
           autoComplete='off'
           onChange={(e) => setEmail(e.target.value)}
           required
           value={email}
           />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input 
          name='password'
          type='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
           />
        </div>
        <button>Login</button>
        </form>
        <div>
          Don't have an account? <Link  to='/signup'>Create an account</Link>
        </div>
      </div>
    </section>
  );
}
