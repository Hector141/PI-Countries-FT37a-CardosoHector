import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  orderByPopulation,
  filterByContinent,
  fetchAllCountries,
  setCountryOrderAlph,
  getActivities,
  filterCountriesByActivity
  // ...importa otras acciones necesarias
} from '../../redux/actions';
import './filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const orderPopulation = useSelector((state) => state.orderPopulation);
  const ordenAlph = useSelector((state) => state.ordenAlph);
  const continent = useSelector((state) => state.continent);
  const allCountries = useSelector((state) => state.allCountries);
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const allActivities = useSelector((state) => state.allActivities);

  useEffect(() => {
    if (!allActivities.length) {
      dispatch(getActivities())
        .catch((error) => {
          console.log('Error al obtener las actividades:', error);
        });
    }
  }, [allActivities, dispatch]);

  const handleOrderPopulation = (event) => {
    const order = event.target.value;
    if (filteredCountries.length > 0) {
      dispatch(orderByPopulation(order));
    } else {
      dispatch(orderByPopulation(order, allCountries));
    }
  };

  const handleContinentChange = (event) => {
    const selectedContinent = event.target.value;
    if (selectedContinent === 'All') {
      dispatch(fetchAllCountries());
    } else {
      dispatch(filterByContinent(selectedContinent));
    }
  };

  const handleOrdenAlph = (event) => {
    const orden = event.target.value;
    if (filteredCountries.length > 0) {
      dispatch(setCountryOrderAlph(orden));
    } else {
      dispatch(setCountryOrderAlph(orden, allCountries));
    }
  };

  const handleActivityChange = (event) => {
    const activityName = event.target.value;
    dispatch(filterCountriesByActivity(activityName));
  };

  return (
    <div className="filter">
      <div className="filter_contenedor">
        <select className="select_activities" onChange={handleActivityChange} defaultValue="">
          <option value="" disabled>Selecciona una actividad</option>
          {[...new Set(allActivities.map((activity) => activity.name))].map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          className="select_population"
          name="orderPopulation"
          value={orderPopulation}
          onChange={handleOrderPopulation}
        >
          <option value="Max" key="Max">
            Max population
          </option>
          <option value="Min" key="Min">
            Min population
          </option>
        </select>

        <select
          className="select_alph"
          name="ordenAplh"
          value={ordenAlph}
          onChange={handleOrdenAlph}
        >
          <option value="asc" key="asc">
            alphabetically Asd
          </option>
          <option value="des" key="des">
            alphabetically Des
          </option>
        </select>

        <select
          className="select_all"
          name="continents"
          value={continent}
          onChange={handleContinentChange}
        >
          <option value="All" key="All">
            All continents
          </option>
          <option value="Africa" key="Africa">
            Africa
          </option>
          <option value="Antarctica" key="Antarctica">
            Antarctica
          </option>
          <option value="Asia" key="Asia">
            Asia
          </option>
          <option value="Europe" key="Europe">
            Europe
          </option>
          <option value="North America" key="NorthAmerica">
            North America
          </option>
          <option value="Oceania" key="Oceania">
            Oceania
          </option>
          <option value="South America" key="SouthAmerica">
            South America
          </option>
        </select>
      </div>
    </div>
  );
 }  

export default Filter;
