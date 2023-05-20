import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  fetchCountriesByName,
  getActivities,
  // ...importa otras acciones necesarias
} from '../../redux/actions';
import './searchBar.css';


const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState([]);
  const allActivities = useSelector((state) => state.allActivities);

  useEffect(() => {
    if (!allActivities.length) {
      dispatch(getActivities())
        .catch((error) => {
          console.log('Error al obtener las actividades:', error);
        });
    }
  }, [allActivities, dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchCountriesByName(searchTerm))
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setErrors(['No se encontraron resultados exactos para su búsqueda']);
            console.log('Error 404: No se encontraron resultados para la búsqueda');
          } else {
            setErrors(['Error de búsqueda']);
            console.log('Error de búsqueda:', error);
          }
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, searchTerm]);

  const handleSearchTermChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setErrors([]);
  };

  return (
    <div className="searchBar">

      <div className="search_contenedor">
        <input
          className="buscador"
          placeholder="Busque el pais deseado... ej: Argentina"
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
  
        {errors.length > 0 && (
          <div className="error_search">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
      <NavLink to="/form"><button className="form">Crear Actividad</button></NavLink>
    </div>
  );
};

export default SearchBar;
