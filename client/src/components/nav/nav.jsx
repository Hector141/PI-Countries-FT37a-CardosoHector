import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  const location = useLocation();
  const hideFormLink = location.pathname === '/form';

  return (
    <div className="nav">
      <NavLink to="/home">
        <button className="home">HOME</button>
      </NavLink>
      {!hideFormLink && (
        <NavLink to="/form">
          <button className="form">Crear Actividad</button>
        </NavLink>
      )}
    </div>
  );
};

export default Nav;
