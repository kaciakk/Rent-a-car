import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importuj axios

const LOGIN_URL ='http://localhost:3500/auth/login';

export default function Login() {
  const { dispatch } = useContext(AuthContext); // Pobierz dispatch z kontekstu

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
      const response = await axios.post('http://localhost:3500/auth/login', {
      email,
    password
}, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
  // Tutaj otrzymujemy odpowiedź z tokenem
  const { accessToken, username, roles, _id } = response.data;


  

  // Zapisujemy token w localStorage, aby zachować go po odświeżeniu strony
  localStorage.setItem('accessToken', accessToken);


  // Aktualizujemy stan w AuthContext za pomocą dispatch
  dispatch({
    type: 'LOGIN',
    payload: {
      accessToken,
      username,
      email,
      roles,
      _id,
 
  
    },
  });
        setEmail('');
        setPassword('');
        setSuccess(true);
        navigate('/')
        console.log('roles:', roles);
        console.log('username:', username);
        console.log('accessToken:', accessToken);
        console.log('_id:', _id);
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
