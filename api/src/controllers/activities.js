const { Activity, Country } = require("../db");


const createActivity = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
  
    try {
      // Crear la actividad turística en la base de datos
      const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season
      });
  
      // Relacionar la actividad turística con los países indicados
      if (countries && countries.length > 0) {
        const countriesToUpdate = await Country.findAll({
          where: {
            id: countries
          }
        });
  
        await newActivity.addCountries(countriesToUpdate);
      }
  
      res.status(201).json({ message: 'Actividad turística creada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  const getActivities = async (req, res) => {
    try {
      // Obtener todas las actividades turísticas
      const activities = await Activity.findAll();
  
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    createActivity, getActivities
}