const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

router.post('/', placesController.createPlace);  
router.get('/', placesController.getPlaces);
router.get('/:id(\\d+)/', placesController.getPlace);
router.put('/:id(\\d+)/', placesController.updatePlace);
router.delete('/:id(\\d+)/', placesController.deletePlace);
router.get('/creator/:id(\\d+)/', placesController.findByUserId);


module.exports = router;