const express = require('express')
const router = express.Router()
const { getContentHome } = require('../controllers/home.controller')
const { checkAdminPermission } = require('../midlewares/authentication.midleware')

router.get('/', checkAdminPermission, getContentHome)

module.exports = router
