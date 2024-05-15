import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './Assets/logo.png';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo-header">
        <Link to="/">
          <img src={logo} alt="Online Exam Builder" className="logo-img" />
        </Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/Components/about">
              <button className="header-about">About Us</button>
            </Link>
          </li>
          <li><button className="nav-button">Features</button></li>
          <li><button className="nav-button">Plans & Pricing</button></li>
          <li><button className="nav-button">Blog</button></li>
          <li><button className="nav-button">Demo</button></li>
          <li><button className="nav-button">Help</button></li>
        </ul>
      </nav>
      <div className="auth">
  {location.pathname === '/login' ? (
    <Link to="/register">
      <button className="login-button-">Sign Up</button>
    </Link>
  ) : (
    <Link to="/login">
      <button className="login-button-" disabled={location.pathname === '/login'}>LogIn</button>
    </Link>
  )}
</div>

    </header>
  );
};

export default Header;
