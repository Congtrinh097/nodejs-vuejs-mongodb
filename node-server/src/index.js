require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const { checkAuth } = require('./midlewares/authentication.midleware');

const port = 3000

const db = process.env.DATABASE;

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mongoose.connect(db)
  .then(() => console.log('Connected to Database'))
  .catch(err => {
    throw new Error(err)
  });

require('./midlewares/user-passport.midleware')(passport);

app.use(passport.initialize());
// check authentication
app.use(checkAuth)

// Admin APIs
app.use('/', require('./routers/home.router'))

// users APIs
app.use('/users', require('./routers/user.router'))

// video APIs
app.use('/videos', require('./routers/video.router'))

// start listion server
app.listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT}`);
});