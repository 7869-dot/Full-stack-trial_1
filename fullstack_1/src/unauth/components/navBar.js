import React from 'react';
import './navbar.css';
import logo from '../../assests/logo.jpg';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="tubestamp logo" className="logo-image" />
          <span className="logo-text">Prodstamp</span>
        </div>
        <div className="navbar-links">
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#blog" className="nav-link">Blog</a>
        </div>
        <button className="navbar-cta">Do More With Video</button>
      </div>
    </nav>
  );
};

export default NavBar;

