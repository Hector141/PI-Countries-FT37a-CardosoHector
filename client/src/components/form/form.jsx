import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, fetchAllCountries, getActivities } from '../../redux/actions';
import Validate from './validates';
import './form.css';

const Form = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  const [activityData, setActivityData] = useState({
    name: '',
    dificulty: '',
    duration: '',
    season: '',
    countries: [],
  });

  const { name, dificulty, duration, season, countries } = activityData;

  const [isOpen, setIsOpen] = useState(false);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const selectRef = useRef(null);
  const [activityMessage, setActivityMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const handleDocumentClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newActivity = {
      name,
      dificulty,
      duration,
      season,
      countries,
    };

    const errors = Validate(newActivity);
    if (Object.keys(errors).length === 0) {
      setActivityMessage('Se creó la actividad correctamente.');

      try {
        await dispatch(createActivity(newActivity));
        await dispatch(getActivities());
        resetForm(); // Reiniciar los campos después de enviar el formulario
      } catch (error) {
        console.log('Error al crear o obtener las actividades:', error);
      }
    } else {
      setError(errors);
      setActivityMessage('No se pudo crear la actividad.');
    }
  };

  const handleCountryChange = (countryId) => {
    const isCountrySelected = countries.includes(countryId);
    if (!isCountrySelected) {
      setActivityData({
        ...activityData,
        countries: [...countries, countryId],
      });
      setIsCountrySelected(true);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const seasons = ['Summer', 'Autumn', 'Winter', 'Spring'];

  const handleFieldChange = (event) => {
    // Reiniciar el estado de errores al modificar los campos
    setError({});

    setActivityData({
      ...activityData,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setActivityData({
      name: '',
      dificulty: '',
      duration: '',
      season: '',
      countries: [],
    });
    setIsCountrySelected(false);
  };

  return (
    <div className="cont_form">
      <form onSubmit={handleSubmit} noValidate>
        <div className="contenedor_form">
          <h2>Create New Activity</h2>
          <div className="select-wrapper" ref={selectRef}>
            <div className={`select-selected ${isOpen ? 'active' : ''}`} onClick={toggleDropdown}>
              {isCountrySelected ? `Selected (${countries.length})` : 'Select countries'}
            </div>
            <div className={`select-items ${isOpen ? 'active' : ''}`}>
              {allCountries.map((country) => (
                <div
                  key={country.id}
                  onClick={() => handleCountryChange(country.id)}
                  className={countries.includes(country.id) ? 'selected' : ''}
                >
                  {country.name}
                </div>
              ))}
            </div>
          </div>
          {error.countries && <p className="error">{error.countries}</p>}
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleFieldChange}
              required
            />
          </div>
          {error.name && <p className="error">{error.name}</p>}
          <div>
            <label htmlFor="dificulty">
              Difficulty: Easy
              <input
                type="range"
                id="dificulty"
                name="dificulty"
                value={dificulty}
                min="1"
                max="5"
                step="1"
                onChange={handleFieldChange}
                required
              />
              Hard
            </label>
          </div>
          {error.dificulty && <p className="error">{error.dificulty}</p>}
          <div>
            <label htmlFor="duration">
              Duration:
              <input
                type="text"
                id="duration"
                name="duration"
                value={duration}
                onChange={handleFieldChange}
                required
              />
              Hours
            </label>
          </div>
          {error.duration && <p className="error">{error.duration}</p>}
          <div>
            <p className="season">Season:</p>
            {seasons.map((seasonOption) => (
              <div key={seasonOption}>
                <input
                  type="radio"
                  id={seasonOption}
                  name="season"
                  value={seasonOption}
                  checked={season === seasonOption}
                  onChange={handleFieldChange}
                  required
                />
                <label htmlFor={seasonOption}>{seasonOption}</label>
              </div>
            ))}
          </div>
          {error.season && <p className="error">{error.season}</p>}
          <div>
            <button type="submit">Create Activity</button>
          </div>
          <p className="respuesta">{activityMessage}</p>
        </div>
      </form>
    </div>
  );
};

export default Form;
