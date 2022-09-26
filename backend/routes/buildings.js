const express = require('express');
const router = express.Router(); 

const auth = require('../middleware/auth');
const buildingCtrl = require('../controllers/buildings');

router.post('/upgrade', auth, buildingCtrl.upgrade); // Récupère le nom, numéro et localisation de la panète sélectionnée
router.post('/downgrade', auth, buildingCtrl.downgrade); // Récupère le nom, numéro et localisation de la panète sélectionnée
router.post('/displaybuildings', auth, buildingCtrl.displayBuildings); // Renvoie les bâtiments à afficher en fonction de la page (ressources, installations)

module.exports = router;