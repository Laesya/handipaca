const express = require('express');
const router = express.Router();
const typesPlaceController = require('../controllers/typesPlaceController');

router.post('/', typesPlaceController.createPlace);  
router.get('/', typesPlaceController.getPlaces);
router.get('/:id(\\d+)/', typesPlaceController.getPlace);
router.get('/false', typesPlaceController.getPlaceFalse);
router.get('/true', typesPlaceController.getPlaceTrue);
router.put('/:id(\\d+)/', typesPlaceController.updatePlace);
router.delete('/:id(\\d+)/', typesPlaceController.deletePlace);

module.exports = router;