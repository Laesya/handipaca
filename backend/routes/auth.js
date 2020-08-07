const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.post('/signin', passport.authenticate('local', { session:false}), authController.signIn);
router.post('/signup', authController.signUp);
router.put('/changePassword', passport.authenticate('jwt', { session:false}), authController.changePassword);
router.delete('/deleteAccount', passport.authenticate('jwt', { session:false}), authController.deleteAccount);

module.exports = router;
