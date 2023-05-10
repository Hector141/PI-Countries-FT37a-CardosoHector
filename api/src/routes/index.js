const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getCountries, getCountryById , getCountriesByName } = require("../controllers/countries")
const { getActivities, createActivity } = require("../controllers/activities")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', getCountries);
router.get('/countries/:idPais', getCountryById);   //countries/id
router.get('/countries/name', getCountriesByName);  ///countries/?name=Bermudas

router.get("/activities" , getActivities)
router.post("/activities", createActivity)

module.exports = router;
