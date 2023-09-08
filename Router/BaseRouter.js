const AdminController = require('../src/Admin/AdminController')

const express = require('express')

router = express.Router()

router.get('/',AdminController.GetPatient)

module.exports = router