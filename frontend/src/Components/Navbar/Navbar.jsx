import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Navbar() {
  const { username, roles, accessToken, dispatch } = useContext(AuthContext); // Pobierz username, roles, accessToken i dispatch z kontekstu autentykacji

  function hasUserRole(roles, roleToCheck) {
    return roles.includes(roleToCheck);
  }
  
  const isAdmin = roles && roles.includes('Admin');
  const isUser = roles && roles.includes('User');

  const [showMenu, setShowMenu] = useState(false); // Stan do zarządzania widocznością menu na mniejszych ekranach

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3500/auth/logout'); // Wywołaj endpoint do wylogowania
      dispatch({ type: 'LOGOUT' }); // Wywołaj akcję LOGOUT z kontekstu autentykacji

      // Wyczyść dane z localStorage po wylogowaniu
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('roles');
      localStorage.removeItem('_id');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
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
            <Link to='contact'>Contact</Link>
          </li>
         
          {isUser && (
          <li>
            <Link to='cart'>Your Cars</Link>
          </li>
        )}
          {isAdmin && (
            <li>
              <Link to='adminpanel'>Add New Car</Link>
            </li>
            
          )}
        </ul>
      </div>

      <div className='nav-toggle' onClick={() => setShowMenu(!showMenu)}>
        <div className={`nav-toggle-icon ${showMenu ? 'active' : ''}`}></div>
      </div>

      <div className='nav-login'>
        
        {accessToken ? (
          <div>
            <p>Zalogowany jako: {username}</p>
    
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
