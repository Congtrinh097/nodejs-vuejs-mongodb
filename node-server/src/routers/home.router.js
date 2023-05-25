const express = require('express')
const router = express.Router()
const { getHomeContent } = require('../services/home.service')
const { checkAdminPermission } = require('../midlewares/authentication.midleware')

router.get('/', checkAdminPermission, getHomeContent)

module.exports = router
