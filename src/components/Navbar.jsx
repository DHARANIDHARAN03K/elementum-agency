import { useState } from 'react'
import '../styles/Navbar.css'

/* 
  WHY A SEPARATE NAVBAR COMPONENT?
  Because navigation appears on every page.
  If you wrote it inside App.jsx directly, and later 
  wanted to change one link, you'd have to find it 
  inside a massive file. A component isolates it.

  ──────────────────────────────────────────────
  CONCEPT: useState — The React Way to Store Data
  ──────────────────────────────────────────────
  Before React, people wrote: document.getElementById('menu').classList.toggle('open')
  That DIRECTLY touches the HTML (the DOM). React says: "Don't do that. Tell ME the 
  data changed. I will update the HTML."

  useState(false) creates:
  - isMenuOpen  → the CURRENT value (starts as false = menu is closed)
  - setIsMenuOpen → the FUNCTION to change that value

  When you call setIsMenuOpen(true), React:
  1. Updates isMenuOpen to true
  2. Re-renders (re-draws) the component
  3. The CSS class changes → menu appears

  This is called "declarative" — you say WHAT the state is,
  React figures out HOW to update the screen.
  document.getElementById is "imperative" — you manually tell the browser
  EVERY step to take. React's way is cleaner and less error-prone.
*/

const Navbar = () => {
  // useState(false) = menu starts closed (false)
  // isMenuOpen is the current state value
  // setIsMenuOpen is the function to change it
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev) 
    // !prev = flip: if true → false, if false → true
    // Using prev (previous value) is safer than !isMenuOpen in async situations
  }

  // Close menu when a nav link is clicked (good UX)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="navbar" id="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__container">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="Elementum home">
          Elementum
        </a>

        {/* Desktop Navigation Links */}
        <ul className="navbar__links" role="list">
          <li><a href="#studio" className="navbar__link">Studio</a></li>
          <li><a href="#services" className="navbar__link">Services</a></li>
          <li><a href="#contact" className="navbar__link">Contact</a></li>
          <li><a href="#faq" className="navbar__link">FAQs</a></li>
        </ul>

        {/* Hamburger button — REACT WAY: onClick changes state, state changes class */}
        <button 
          className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--open' : ''}`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}  /* accessibility: screen readers know if menu is open */
          id="hamburger-btn"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* 
        Mobile menu — no id needed, no document.getElementById
        React controls the class directly based on isMenuOpen state.
        When isMenuOpen = true → className = "navbar__mobile open"
        When isMenuOpen = false → className = "navbar__mobile"
        Template literal (backtick + ${}) lets us build strings with variables.
      */}
      <div 
        className={`navbar__mobile ${isMenuOpen ? 'open' : ''}`}
        role="dialog" 
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}  /* hides from screen readers when closed */
      >
        <ul role="list">
          <li><a href="#studio" className="navbar__link" onClick={closeMenu}>Studio</a></li>
          <li><a href="#services" className="navbar__link" onClick={closeMenu}>Services</a></li>
          <li><a href="#contact" className="navbar__link" onClick={closeMenu}>Contact</a></li>
          <li><a href="#faq" className="navbar__link" onClick={closeMenu}>FAQs</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
