import React from 'react';
import './footer.css';
import gitImage from "./git.png"
import linkIma from "./linkenima.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="links">
        <a href="https://github.com/Hector141" target="_blank" rel="noopener noreferrer">
        <img className='gitima' src={gitImage} alt="" />
          </a>
          <a href="https://www.linkedin.com/in/hector-cardoso-503531264/" target="_blank" rel="noopener noreferrer">
        <img className='linkenima' src={linkIma} alt="" />
          </a>

        </div>
        <p className="rights">© 2023 Todos los derechos reservados</p>
        
      </div>
    </footer>
  );
};

export default Footer;
