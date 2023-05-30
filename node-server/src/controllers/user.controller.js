const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const moment = require('moment');

const { bcryptHash, jwtSign } = require('../utils/jwt.util');
const User = require('../schemas/user.schema');

function register(req, res) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.json({
          status: 'EMAIL_ALREADY_EXISTS',
          message: 'Email existing',
        });
      }
      
      const profile = gravatar.url(req.body.email, {
        s: 200, // size
        r: 'pg', // ratings
        d: 'mm', // default
      })

      const newUser = User({
        name: req.body.name,
        email: req.body.email,
        birthDate: moment(req.body.birthDate, 'DD/MM/YYYY'),
        password: req.body.password,
        profile,
      });

      bcryptHash(newUser.password)
        .then(hash => {
          newUser.password = hash;
          return newUser.save();
        })
        .then(() => {
          res.json({
            status: true,
            message: 'Successful register!',
          });
        })
        .catch(err => {
          throw new Error(err);
        });

    });
}

function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      /* Email not found */
      if(!user) {
        return res.json({
          status: 'USER_NOT_FOUND',
          message: 'Not found',
        });
      }

      /* Check if password is correct */
      bcrypt.compare(password, user.password).then(isMatch => {
        if(!isMatch) {
          return res.json({
            status: 'PASSWORD_INCORRECT',
            message: 'Password incorrect',
          });
        }

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          birthDate: user.birthDate,
          createdDate: user.createdDate,
          updatedDate: user.updatedDate,
        }

        jwtSign(payload)
          .then(token => {
            res.json({
              status: 'success',
              message: 'Login successful!',
              profile: payload,
              token: token,
            });
          })
          .catch(err => {
            throw new Error(err);
          })
      });
    });
}

function update(req, res) {
  const formData = {
    name: req.body.name,
    updatedDate: moment(),
  }

  const opts = {
    new: true,
  }
  User.findOneAndUpdate({ _id: req.params.id} , { $set: formData }, opts)
    .then(user => {
      res.json(user);
    });
}

function userDelete(req, res) {
  
  User.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({
        status: 'ACCOUNT_DELETED',
        message: 'Account deleted!',
      })
    });
}

const getUserList = (req, res) => {
  User.find({}).then(users => {
    res.send(users);  
  });
}

module.exports = {
  register,
  login,
  update,
  userDelete,
  getUserList
}