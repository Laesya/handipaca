const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

  router.get('/', usersController.getUsers);
  router.get('/admins', usersController.getAdmins);
  router.get('/:id(\\d+)/', usersController.getUser);
  router.put('/:id(\\d+)/', usersController.updateUser);

module.exports = router;