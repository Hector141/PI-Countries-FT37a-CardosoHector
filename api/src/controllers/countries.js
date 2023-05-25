const { Activity, Country } = require('../db');
const { Op } = require('sequelize');



const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({ include: Activity });
    
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
    let countries;
    
    if (name) {
      countries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}%` // Realizar búsqueda insensible a mayúsculas/minúsculas
          }
        },
        include: Activity 
      });
    } else {
  
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







module.exports = { getCountries, getCountryById, getCountriesByName };



