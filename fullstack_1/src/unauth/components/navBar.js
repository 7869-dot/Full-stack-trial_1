import React, { useState } from 'react';
import './navbar.css';
import logo from '../../assests/logo.jpg';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="tubestamp logo" className="logo-image" />
          <span className="logo-text">Prodstamp</span>
        </div>
        <button
          className={`navbar-toggle ${isOpen ? 'open' : ''}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <div className="navbar-links">
            <a href="#pricing" className="nav-link" onClick={closeMenu}>
              Pricing
            </a>
            <a href="#blog" className="nav-link" onClick={closeMenu}>
              Blog
            </a>
          </div>
          <button className="navbar-cta" onClick={closeMenu}>
            Do More With Video
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

