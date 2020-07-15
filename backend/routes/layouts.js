const express = require('express');
const router = express.Router();
const layoutsController = require('../controllers/layoutsController');

router.post('/', layoutsController.createLayout);  
router.get('/', layoutsController.getLayouts);
router.get('/:id(\\d+)/', layoutsController.getLayout);
router.put('/:id(\\d+)/', layoutsController.updateLayout);
router.delete('/:id(\\d+)/', layoutsController.deleteLayout);

module.exports = router;