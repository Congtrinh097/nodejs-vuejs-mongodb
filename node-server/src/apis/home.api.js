const homeService = require('../service/home.service');

const getContentHome = (req, res) => {
  return homeService.getContentHome()
  .then(data => {
    return res.status(200).send(data)
  })
  .catch(error => {
    return res.status(500).send(error.message)
  })
}

module.exports = {
  getContentHome
}