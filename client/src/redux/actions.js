import axios from 'axios';
import {ALL_COUNTRIES , FETCH_COUNTRY_DETAIL,  ORDER_BY_POPULATION, FILTER_BY_CONTINENT
,FETCH_COUNTRIES_BY_NAME, CREATE_ACTIVITY, SET_COUNTRY_ORDER,  GET_ACTIVITIES, FILTER_COUNTRIES_BY_ACTIVITY} from "./actios-types";



export const fetchAllCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/countries');
      dispatch({
        type: ALL_COUNTRIES,
        payload: response.data,
      });
    }  catch (error) {
      console.log(error);
    }
  };
};



export const fetchCountryDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/${id}`);
      const countryDetail = response.data;

      dispatch({
        type: FETCH_COUNTRY_DETAIL,
        payload: countryDetail,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const fetchCountriesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/name?name=${name}`);
      dispatch({
        type: FETCH_COUNTRIES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
};


export const filterCountriesByActivity = (activityName) => {
  return {
    type: FILTER_COUNTRIES_BY_ACTIVITY,
    payload: activityName
  };
};




export const orderByPopulation = (order) => {
  return {
    type: ORDER_BY_POPULATION,
    payload: order,
  };
};

export const filterByContinent = (continent) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: continent,
  };
};


export const setCountryOrderAlph = (order) => {
  return {
    type: SET_COUNTRY_ORDER,
    payload: order,
  };
};




export const createActivity = (activityData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/activities', activityData);

      // Dispatch de la acción con el tipo correspondiente
      dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data.message
      });
    }catch (error) {
      console.log('Error al crear la actividad:', error.response.data.error);
    }
    
  };
};



export const getActivities = () => {
  return async dispatch => {
    try {
      const response = await axios.get('http://localhost:3001/activities');
      dispatch({ type: GET_ACTIVITIES, payload: response.data });
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };
};




