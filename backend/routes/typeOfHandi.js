const express = require('express');
const router = express.Router();
const typeHandiController = require('../controllers/typeHandiController');

router.post('/', typeHandiController.createHandi);  
router.get('/', typeHandiController.getHandi);
router.get('/:id(\\d+)/', typeHandiController.getHandi);
router.get('/false', typeHandiController.getHandiFalse);
router.get('/true', typeHandiController.getHandiTrue);
router.put('/:id(\\d+)/', typeHandiController.updateHandi);
router.delete('/:id(\\d+)/', typeHandiController.deleteHandi);

module.exports = router;