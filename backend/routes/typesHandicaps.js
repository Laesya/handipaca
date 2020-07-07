const express = require('express');
const router = express.Router();
const HandicapsController = require('../controllers/handicapsController');

  router.get('/', HandicapsController.getHandicaps);
  router.get('/:id(\\d+)/', HandicapsController.getHandicap);
  /*router.put('/:id(\\d+)/', usersController.updateUser);
  router.delete('/:id(\\d+)/', usersController.deleteUser);
  router.get('/profile', usersController.getUserProfile);
  router.put('/profile', usersController.updateUserProfile);*/

module.exports = router;