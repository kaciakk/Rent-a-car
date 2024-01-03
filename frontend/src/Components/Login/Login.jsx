import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='login-container'>
      <div className='login-container-inside'>
        <h2>Loginnnn</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
        <div>
          Don't have an account? <Link  to='/signup'>Create an account</Link>
        </div>
      </div>
    </div>
  );
}
