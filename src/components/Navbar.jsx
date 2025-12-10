import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          REMEM<span className="logo-accent">.FILM</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/photography" className={isActive('/photography')} onClick={() => setIsOpen(false)}>Photography</Link>
          <Link to="/videography" className={isActive('/videography')} onClick={() => setIsOpen(false)}>Videography</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setIsOpen(false)}>Contact</Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
