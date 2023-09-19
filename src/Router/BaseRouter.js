const AdminController = require('../Controllers/AdminController')
const RecordController = require('../Controllers/RecordController')
const AuthenticationController = require('../Controllers/AuthenticationController')
const FactController = require('../Controllers/FactController')
const express = require('express');
const FormController = require('../Controllers/FormController');

const router = express.Router()

router.get('/record/',RecordController.getRecord)
router.get('/records',RecordController.getRecords)
router.get('/admin/records',RecordController.adminGetRecords)

router.post('/record/add',RecordController.addRecord)
router.delete('/record/:sub_record',RecordController.deleteRecord)
router.post('/record/add/:sub_record',RecordController.addRecord)

router.post('/signup',AuthenticationController.signup)
router.post('/signin',AuthenticationController.signin)
router.post('/admin/signin',AuthenticationController.adminSignin)
router.post('/admin/addstaff',AuthenticationController.adminSignup)

router.get('/facts',FactController.getFacts) // In progress (on working)
// router.post('/admin/facts',FactController.addFact) // In progress

// router.get('/patient/profile',Patient.getProfile) // In progress

router.get('/form',FormController.getForm) //working on
router.post('/form',FormController.addForm) //working on
router.put('/form',FormController.updateForm)
router.delete('/form',FormController.deleteForm)


module.exports = router;