import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { username,roles, accessToken } = useContext(AuthContext); // Pobierz username i accessToken z kontekstu autentykacji

  function hasUserRole(roles, roleToCheck) {
    return roles.includes(roleToCheck);
  }
  
  const isAdmin = roles && roles.includes('Admin');
  



  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to="/" className="nav-logo-link">
          <img src={logo} alt="logo" className="nav-logo-img" />
        </Link>
        <ul className='nav-menu'>
          <li>
            <Link to='cars'>Cars</Link>
          </li>
          <li>
            <Link to='offer'>Offer</Link>
          </li>
          <li>
            <Link to='aboutus'>About us</Link>
          </li>
          <li>
            <Link to='contact'>Contact</Link>
          </li>
          
          {isAdmin && ( // Warunek sprawdzający czy użytkownik ma rolę admin
        <li>
          <Link to='adminpanel'>Admin Panel</Link>
        </li>
      )}
     
        </ul>
      </div>
      <div className='nav-login'>
        {accessToken ? (
          <p>Zalogowany jako: {username}</p>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
