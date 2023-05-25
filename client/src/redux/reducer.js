import {
  ALL_COUNTRIES,
  FETCH_COUNTRY_DETAIL,
  ORDER_BY_POPULATION,
  FILTER_BY_CONTINENT,
  FETCH_COUNTRIES_BY_NAME,
  CREATE_ACTIVITY,
  SET_COUNTRY_ORDER,
  GET_ACTIVITIES,
  FILTER_COUNTRIES_BY_ACTIVITY,
} from './actios-types';

const initialState = {
  allCountries: [],
  countryDetail: {},
  filteredCountries: [],
  activities: [],
  allActivities: [],
  orderPopulation: '', // almacenamientos de ordenamientos y filtros
  orderAlph: '', 
  continent: '', 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        filteredCountries: action.payload,
      };


    case FETCH_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };
      
      case ORDER_BY_POPULATION:
        let orderPopulation = ''; // Valor por defecto
        if (action.payload === 'Max' || action.payload === 'Min') {
          orderPopulation = action.payload 
        }
        const sortedCountriesPopulation = [...state.filteredCountries].sort((a, b) => {
          if (orderPopulation === 'Max') {
            return b.population - a.population ;
          } else if (orderPopulation === 'Min') {
            return a.population - b.population ;
          }
          return 0;
        });
        return {
          ...state,
          filteredCountries: sortedCountriesPopulation,
          orderPopulation: orderPopulation,
        };
      
      case SET_COUNTRY_ORDER:
        let orderAlph = ''; // Valor por defecto
        if (action.payload === 'asc' || action.payload === 'desc') {
          orderAlph = action.payload;
        }
        const sortedCountriesAlphabetically = [...state.filteredCountries].sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (orderAlph === 'asc') {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
        return {
          ...state,
          filteredCountries: sortedCountriesAlphabetically,
          orderAlph: orderAlph,
        };
      
    case FILTER_BY_CONTINENT:
      const filteredCountriesByContinent = state.allCountries.filter((country) => country.continent === action.payload);
      return {
        ...state,
        filteredCountries: filteredCountriesByContinent,
        continent: action.payload,
      };

    case FETCH_COUNTRIES_BY_NAME:
      return {
        ...state,
        filteredCountries: action.payload,
      };

    case CREATE_ACTIVITY:
      const { name, difficulty, duration, season, countries } = action.payload;
      const newActivity = {
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
        countries: countries,
      };
      return {
        ...state,
        activities: [...state.activities, newActivity],
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
      };

    case FILTER_COUNTRIES_BY_ACTIVITY:
      const activityName = action.payload;
      if (activityName === 'All') {
        const filteredCountriesByActivity = state.allCountries.filter((country) => country.activities.length > 0);
        return {
          ...state,
          filteredCountries: filteredCountriesByActivity,
        };
      }
      const filteredCountriesByActivity = state.allCountries.filter((country) =>
        country.activities.some((activity) => activity.name === activityName)
      );
      return {
        ...state,
        filteredCountries: filteredCountriesByActivity,
      };

      
    default:
      return state;
  }
};

export default reducer;
