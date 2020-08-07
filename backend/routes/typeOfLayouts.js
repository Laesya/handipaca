const express = require('express');
const router = express.Router();
const layoutsController = require('../controllers/typeLayoutsController');

router.post('/', layoutsController.createLayout);  
router.get('/', layoutsController.getLayouts);
router.get('/:id(\\d+)/', layoutsController.getLayout);
router.get('/false', layoutsController.getLayoutFalse);
router.get('/true', layoutsController.getLayoutTrue);
router.put('/:id(\\d+)/', layoutsController.updateLayout);
router.delete('/:id(\\d+)/', layoutsController.deleteLayout);

module.exports = router;