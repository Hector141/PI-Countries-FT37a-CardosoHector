const { Activity, Country } = require('../db');
const { Op } = require('sequelize');



const getCountries = async (req, res) => {
    const { name } = req.query;
    
    try {
      let countries;
      
      if (name) {
        // Filtrar por nombre si se proporciona
        countries = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `${name}%` // Realizar búsqueda insensible a mayúsculas/minúsculas
            }
          },
          include: Activity // Incluir las actividades relacionadas
        });
      } else {
        // Obtener todos los países sin filtrar
        countries = await Country.findAll({ include: Activity });
      }
      
      if (countries.length > 0) {
        res.json(countries);
      } else {
        res.status(404).json({ msg: 'Not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


const getCountryById = async (req, res) => {
  const { idPais } = req.params;

  try {
    const country = await Country.findOne({
      where: {
        id: idPais
      },
      include: Activity // Incluir las actividades relacionadas
    });

    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ msg: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCountriesByName = async (req, res) => {
  const { name } = req.query;

  try {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%` // Búsqueda insensible a mayúsculas/minúsculas y no exacta
        }
      }
    });

    if (countries.length > 0) {
      res.json(countries);
    } else {
      res.status(404).json({ msg: 'No se encontraron países con ese nombre' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const CountriesActivity = async (req, res) => {
  try {
    const countries = await Country.findAll({
      include: Activity, // Incluir las actividades relacionadas
    });

    // Filtrar los países que tienen actividades asociadas
    const countriesWithActivities = countries.filter(country => country.activities.length > 0);

    res.json(countriesWithActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = { getCountries, getCountryById, getCountriesByName,CountriesActivity };



