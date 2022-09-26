const express = require('express');
const router = express.Router(); 

const auth = require('../middleware/auth');
const dataCtrl = require('../controllers/data');

router.get('/getplanet', auth, dataCtrl.getPlanet); // Récupère le nom, numéro et localisation de la panète sélectionnée
router.get('/getdata', auth, dataCtrl.getData); // Récupère, calcule et actualise les ressources possédée sur la planète sélectionnée (getData)

module.exports = router;