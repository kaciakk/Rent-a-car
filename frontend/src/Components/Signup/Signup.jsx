import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className='signup-container'>
      <div className='signup-container-inside'>
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Sign Up</button>
        <div>
          Already have an account? <Link to='/login'>Log in</Link>
        </div>
      </div>
    </div>
  );
}
