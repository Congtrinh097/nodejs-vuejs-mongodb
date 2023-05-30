const express = require('express');
const passport = require('passport');

const usersController = require('../controllers/user.controller');

const router = express.Router();

/* 
  @route  /api/users
  @desc   Get all users
  @access private
*/
router.get('/',
  // passport.authenticate('jwt', { session: false }),
  usersController.getUserList,
);

/* 
  @route  /api/users/register
  @desc   Register users
  @access public
*/
router.post('/register', usersController.register);

/* 
  @route  /api/users/login
  @desc   Login users
  @access public
*/
router.post('/login', usersController.login);

/* 
  @route  /api/users/update
  @desc   Update profile information
  @access private
*/
router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  usersController.update,
);

/* 
  @route  /api/users/delete
  @desc   Delete account
  @access private
*/
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  usersController.userDelete,
);

module.exports = router;