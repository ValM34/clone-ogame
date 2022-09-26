const express = require('express');
const router = express.Router(); 

const auth = require('../middleware/auth');
const researchCtrl = require('../controllers/researchs');

router.post('/displayresearchs', auth, researchCtrl.displayResearchs); // Renvoie les bâtiments à afficher en fonction de la page (ressources, installations)
router.post('/upgrade', auth, researchCtrl.upgrade);
router.post('/downgrade', auth, researchCtrl.downgrade);

module.exports = router;