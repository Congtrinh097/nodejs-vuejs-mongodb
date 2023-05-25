const express = require('express');
const { checkAuth } = require('./midlewares/authentication.midleware');
const app = express();
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// check authentication
app.use(checkAuth)

// Admin APIs
app.use('/', require('./routers/home.router'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})