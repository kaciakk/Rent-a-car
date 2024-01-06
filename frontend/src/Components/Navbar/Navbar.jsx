import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { username, roles, accessToken } = useContext(AuthContext); // Pobierz username i accessToken z kontekstu autentykacji

  function hasUserRole(roles, roleToCheck) {
    return roles.includes(roleToCheck);
  }
  
  const isAdmin = roles && roles.includes('Admin');
  const isUser = roles && roles.includes('User');

  const [showMenu, setShowMenu] = useState(false); // Stan do zarządzania widocznością menu na mniejszych ekranach

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to="/" className="nav-logo-link">
          <img src={logo} alt="logo" className="nav-logo-img" />
        </Link>
        <ul className={showMenu ? 'nav-menu active' : 'nav-menu'}>
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
          {isAdmin && (
            <li>
              <Link to='adminpanel'>Admin Panel</Link>
            </li>
          )}
        </ul>
      </div>

      <div className='nav-toggle' onClick={() => setShowMenu(!showMenu)}>
        <div className={`nav-toggle-icon ${showMenu ? 'active' : ''}`}></div>
      </div>

      <div className='nav-login'>
        {isUser && (
          <li>
            <Link to='cart'>Cart</Link>
          </li>
        )}
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
