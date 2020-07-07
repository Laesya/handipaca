const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

  router.get('/admins', usersController.getAdmins);
  router.get('/', usersController.getUsers);
  /*router.get('/:id(\\d+)/', usersController.getUser);
  router.put('/:id(\\d+)/', usersController.updateUser);
  router.delete('/:id(\\d+)/', usersController.deleteUser);
  router.get('/profile', usersController.getUserProfile);
  router.put('/profile', usersController.updateUserProfile);*/

module.exports = router;