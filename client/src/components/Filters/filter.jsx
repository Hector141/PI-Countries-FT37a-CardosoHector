import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  orderByPopulation,
  filterByContinent,
  fetchAllCountries,
  setCountryOrderAlph,
  filterCountriesByActivity,
  getActivities,
} from '../../redux/actions';
import './filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const orderPopulation = useSelector((state) => state.orderPopulation);
  const orderAlph = useSelector((state) => state.orderAlph);
  const continent = useSelector((state) => state.continent);
  const allCountries = useSelector((state) => state.allCountries);
  const allActivities = useSelector((state) => state.allActivities);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [lastOrderPopulation, setLastOrderPopulation] = useState(orderPopulation);
  const [lastOrderAlph, setLastOrderAlph] = useState(orderAlph);


  //--------------actividades----------------------------
  useEffect(() => {
    if (!allActivities.length) {  //Obtiene todas la actividades en el select sin necesidad de agregar otra para que cargen
      dispatch(getActivities())
        .catch((error) => {
          console.log('Error al obtener las actividades:', error);
        });
    }
  }, [allActivities, dispatch]);


  //-------------contries-------------------------

  useEffect(() => {
    let filtered = [...allCountries];

    if (continent !== 'All') {
      filtered = filtered.filter((country) => country.continent === continent);
    }

    setFilteredCountries(filtered);
  }, [allCountries, continent]);



  //------------------ordenamientos----------------------------------
  const handleOrderPopulation = (event) => {
    const order = event.target.value;
    setLastOrderPopulation(order);
    dispatch(orderByPopulation(order, filteredCountries));
  };




  const handleOrderAlph = (event) => {
    const order = event.target.value;
    setLastOrderAlph(order);
    dispatch(setCountryOrderAlph(order, filteredCountries));
  };

//-----------------filtros-------------------------------------

const handleContinentChange = (event) => {
  const selectedContinent = event.target.value;
  if (selectedContinent === "All") {
    dispatch(fetchAllCountries());
    dispatch(filterByContinent("All Contries"))
  } else {
    dispatch(filterByContinent(selectedContinent));
  }
};


  const handleActivityChange = (event) => {
    const activityName = event.target.value;
    dispatch(filterCountriesByActivity(activityName));
  };


    useEffect(() => {
    // Aplicar automáticamente los filtros de orden
    

    if (lastOrderPopulation) {
      dispatch(orderByPopulation(lastOrderPopulation, filteredCountries));
    }
    if (lastOrderAlph) {
      dispatch(setCountryOrderAlph(lastOrderAlph, filteredCountries));
    }
   
  }, [ lastOrderPopulation, lastOrderAlph, filteredCountries, dispatch]);

  //---------Limpieza de filtros----------------




  const handleClearFilters = () => {
    dispatch(fetchAllCountries());
    dispatch(filterByContinent("All Contries"))
    setLastOrderPopulation('');
    dispatch(orderByPopulation("", filteredCountries));
    setLastOrderAlph('');    
    dispatch(setCountryOrderAlph("", filteredCountries));
  };
  

  


  
  return (
    <div className="filter">
      <div className="filter_contenedor">
        <select className="select_activities" onChange={handleActivityChange} defaultValue={""}>
          <option value="" disabled>Select Activity</option>
          <option value="All">All Activities</option>
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
          <option value="" disabled>Orden Population</option>
          <option value="Max" key="Max">
            Max Population
          </option>
          <option value="Min" key="Min">
            Min Population
          </option>
        </select>

        <select
          className="select_alph"
          name="orderAlph"
          value={orderAlph}
          onChange={handleOrderAlph}
        >
         <option value="" disabled>Orden Alphabetically</option>
          <option value="asc" key="asc">
            Alphabetically Asc
          </option>
          <option value="desc" key="desc">
            Alphabetically Desc
          </option>
        </select>

        <select
          className="select_all"
          name="continents"
          value={continent}
          onChange={handleContinentChange}
        >
          <option value="All" key="All">
            All Continents
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

        <button className="clear_filters_button" value="All" key="All" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
