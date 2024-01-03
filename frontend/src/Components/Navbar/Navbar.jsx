import React from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to="/" className="nav-logo-link">
          <img src={logo} alt="logo" className="nav-logo-img" />
        </Link>
        <ul className='nav-menu'>
          <li>
            <Link  to='cars'>Cars</Link>
          </li>
          <li>
            <Link  to='offer'>Offer</Link>
          </li>
          <li>
            <Link to='aboutus'>About us</Link>
          </li>
          <li>
            <Link to='contact'>Contact</Link>
          </li>
        </ul>
      </div>
      <div className='nav-login'>
      <Link to="/login">
        <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
