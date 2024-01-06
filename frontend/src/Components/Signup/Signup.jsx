import React, { useState, useRef, useEffect } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import {faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const REGISTER_URL = 'http://localhost:3500/users/register';


export default function Signup() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, [])


  useEffect(() => {
    const result = USER_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidUsername(result);
  }, [username])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password])

  useEffect(() => {
    setErrMsg('');
  },[password, username, email])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const v1 = USER_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);
  
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    } 
  
    try {
      const response = await axios.post('http://localhost:3500/users/register', {
        username: username,
        password: password,
        email: email
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
  
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      navigate('/login')
    } catch(err) {
      if (!err?.response) {
        
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }
  

  return (
    <section className='signup-container'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscrean"} aria-live="assertive">{errMsg}</p>
      <div className='signup-container-inside'>
      <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:
            <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              name="username"
              id="username"
              ref={usernameRef}
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-invalid={validUsername ? 'false' : 'true'}
              aria-describedby = 'uidnote'
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
               />
               <p id='uidnote' className={usernameFocus && username && !validUsername ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
               </p>
          </div>
          <div>
            <label htmlFor="email">Email:
            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
            </label>
            
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby='emailnote'
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              />
               <p id='emailnote' className={emailFocus && !validEmail ? 'instructions': 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must include: <span aria-label="at symbol">@</span> <br />
              </p>
          </div>
          <div>
            <label htmlFor="password">Password:
            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
            
            </label>
            
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? 'false' : 'true'}
              aria-describedby = 'passwordnote'
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              />
              <p id='passwordnote' className={passwordFocus && !validPassword ? 'instructions': 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters:<span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
          </div>


          <button disabled={!validUsername || !validPassword || !validEmail ? true : false}>Sign Up</button>
        </form>
        <div>
          Already have an account? <Link to='/login'>Log in</Link>
        </div>
      </div>
    </section>
  );
}
