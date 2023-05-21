  import {
    ALL_COUNTRIES,
    ALL_COUNTRIES_FAIL,
    FETCH_COUNTRY_DETAIL,
    ORDER_BY_POPULATION, // Nueva acción de ordenamiento
    FILTER_BY_CONTINENT,SET_ALL_COUNTRIES,
    FETCH_COUNTRIES_BY_NAME,
    CREATE_ACTIVITY,
    SET_COUNTRY_ORDER,
    GET_ACTIVITIES,
    FILTER_COUNTRIES_BY_ACTIVITY
    
  } from './actios-types';

  const initialState = {
    allCountries: [],
    countryDetail: {},
    filteredCountries: [], // Nuevo estado para almacenar los países filtrados
    activities: [],
    allActivities: []
  };


  const reducer = (state = initialState, action) => {
    switch (action.type) {

      case ALL_COUNTRIES:
        const sortedCountrie = action.payload.sort((a, b) => b.population - a.population);
        return {
          ...state,
          allCountries: sortedCountrie,
          
          
        };
      case ALL_COUNTRIES_FAIL:
        return {
          ...state,
          allCountries: [],
        };

      case FETCH_COUNTRY_DETAIL:
        return {
          ...state,
          countryDetail: action.payload,
        };
        case ORDER_BY_POPULATION:
          const order = action.payload === 'Max' ? 'desc' : 'asc';
          const sortedCountries = [...state.filteredCountries].sort((a, b) => {
            return order === 'asc' ? a.population - b.population : b.population - a.population;
          });
          return {
            ...state,
            filteredCountries: sortedCountries,
          };

          case SET_COUNTRY_ORDER:
            const countryOrder = action.payload === 'asc' ? 'asc' : 'desc';
        const sortedCountriesAlphabetically = [...state.filteredCountries].sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (countryOrder === 'asc') {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
        return {
          ...state,
          filteredCountries: sortedCountriesAlphabetically,
        };

          case FILTER_BY_CONTINENT:
            const filteredCountrie = state.allCountries.filter(country => country.continent === action.payload);
            return {
              ...state,
              filteredCountries: filteredCountrie,
              // Actualiza el estado de los países filtrados

          };

          case SET_ALL_COUNTRIES:
        return {
          ...state,
          allCountries: action.payload,
          filteredCountries: action.payload,
          };

          case FETCH_COUNTRIES_BY_NAME:
            return {
              ...state,
              filteredCountries: action.payload,
            };

            case CREATE_ACTIVITY:
              const { name, dificulty, duration, season, countries } = action.payload;
              const newActivity = {
                name: name,
                dificulty: dificulty, 
                duration: duration,
                season: season,
                countries: countries
              };
            
              return {
                ...state,
                activities: [...state.activities, newActivity]
              };

              case GET_ACTIVITIES:
                return {
                ...state,
                allActivities: action.payload,
               };

               case FILTER_COUNTRIES_BY_ACTIVITY:
                   const activityName = action.payload;

                   if (activityName === 'All') {
                    const filteredCountries = state.allCountries.filter(country =>
                      country.activities.length > 0
                    );
                    
                    return {
                      ...state,
                      filteredCountries
                    };
                  }
                  
                // Filtrar los países según la actividad seleccionada
                const filteredCountries = state.allCountries.filter(country =>
                 country.activities.some(activity => activity.name === activityName)
              );
              return {
                ...state,
                filteredCountries
              };

      default:
        return state;
    }
  };

  export default reducer;
