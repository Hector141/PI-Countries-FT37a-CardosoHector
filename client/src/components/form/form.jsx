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


// Estado para controlar la apertura y cierre del dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const selectRef = useRef(null);

  const [activityMessage, setActivityMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    dificulty: '',
    duration: '',
    season: '',
    countries: '',
  });

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);


  // Manejo del dropdown
  const handleDocumentClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

// Alternar el estado del dropdown
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
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

    const validationErrors = Validate(newActivity);
    if (Object.keys(validationErrors).length === 0) {
      setActivityMessage('Se creó la actividad correctamente.');

      try {
       await dispatch(createActivity(newActivity));
       await dispatch(getActivities());
        resetForm();
      } catch (error) {
        console.log('Error al crear o obtener las actividades:', error);
      }
    } else {
      setErrors(validationErrors);
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

  const seasons = ['Summer', 'Autumn', 'Winter', 'Spring'];

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    const newErrors = Validate(activityData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name] || '',
    }));
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
          <p className='respuesta'>{activityData.countries}</p>
          {errors.countries && <p className="error">{errors.countries}</p>}
          <div>
            <label htmlFor="name">Name: </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleFieldChange}
              onBlur={handleBlur}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
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
                onBlur={handleBlur}
                required
              />
              Hard
            </label>
            {errors.dificulty && <p className="error">{errors.dificulty}</p>}
          </div>
          <div>
            <label htmlFor="duration">
              Duration:
              <input
                autoComplete="off"
                type="text"
                id="duration"
                name="duration"
                value={duration}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                required
              />
              Hours
            </label>
            {errors.duration && <p className="error">{errors.duration}</p>}
          </div>
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
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor={seasonOption}>{seasonOption}</label>
              </div>
            ))}
            {errors.season && <p className="error">{errors.season}</p>}
          </div>
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
