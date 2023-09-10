const AdminController = require('../Controllers/AdminController')
const RecordController = require('../Controllers/RecordController')
const AuthenticationController = require('../Controllers/AuthenticationController')

const express = require('express')

const router = express.Router()

router.get('/records',RecordController.getRecords)
router.get('/record/:id',RecordController.getRecord)
router.post('/record/add',RecordController.addRecord)

router.post('/signup',AuthenticationController.signup)
router.post('/signin',AuthenticationController.signin)
router.post('/admin/signin',)
router.post('/admin/addstaff',)


module.exports = router;