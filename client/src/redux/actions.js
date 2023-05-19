import axios from 'axios';
import {ALL_COUNTRIES ,ALL_COUNTRIES_FAIL, FETCH_COUNTRY_DETAIL,  ORDER_BY_POPULATION, FILTER_BY_CONTINENT, SET_ALL_COUNTRIES
,FETCH_COUNTRIES_BY_NAME, CREATE_ACTIVITY, SET_COUNTRY_ORDER,  GET_ACTIVITIES, FILTER_COUNTRIES_BY_ACTIVITY} from "./actios-types";



export const fetchAllCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/countries');
      dispatch({
        type: ALL_COUNTRIES,
        payload: response.data,
      });
      dispatch({
        type: SET_ALL_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ALL_COUNTRIES_FAIL,
        payload: error.message,
      });
    }
  };
};



export const fetchCountryDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/${id}`);
      const countryDetail = response.data;

      // Aquí obtén las actividades asociadas al país y agrégalas al objeto countryDetail
      // Puedes hacer esto haciendo una solicitud adicional al backend o asegurándote de que el backend incluya las actividades en la respuesta actual

      dispatch({
        type: FETCH_COUNTRY_DETAIL,
        payload: countryDetail,
      });
    } catch (error) {
      console.log(error);
    }
  };
};




export const orderByPopulation = (order) => {
  return {
    type: ORDER_BY_POPULATION,
    payload: order, // 'A' para ascendente (min to max), 'D' para descendente (max to min)
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




export const fetchCountriesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/?name=${name}`);
      dispatch({
        type: FETCH_COUNTRIES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      // Aquí puedes propagar el error y manejarlo en el componente SearchBar
      throw error;
    }
  };
};



export const createActivity = (activityData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/activities', activityData);
      console.log(response.data); // Opcional: puedes hacer algo con la respuesta del backend si lo deseas

      // Dispatch de la acción con el tipo correspondiente
      dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data.message // Puedes ajustar el payload según la respuesta del backend
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


export const filterCountriesByActivity = (activityName) => {
  return {
    type: FILTER_COUNTRIES_BY_ACTIVITY,
    payload: activityName
  };
};