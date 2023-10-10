const AdminController = require('../Controllers/AdminController')
const ProfileController = require('../Controllers/ProfileController')
const RecordController = require('../Controllers/RecordController')
const AuthenticationController = require('../Controllers/AuthenticationController')
const FactController = require('../Controllers/FactController')
const express = require('express');
const FormController = require('../Controllers/FormController');

const router = express.Router()

// router.get('/record/',RecordController.getRecord)
router.get('/records',RecordController.getRecords)
router.get('/admin/records',RecordController.adminGetRecords)

router.post('/record',RecordController.addRecord)
router.put('/record/',RecordController.updateRecord)
router.delete('/record/',RecordController.deleteRecord)

router.post('/signup',AuthenticationController.signup)
router.post('/signin',AuthenticationController.signin)
router.post('/admin/signin',AuthenticationController.adminSignin)
router.post('/admin/addstaff',AuthenticationController.adminSignup)

router.get('/profile', ProfileController.getUserProfile);
router.put('/profile', ProfileController.updateUserProfile);

router.get('/form',FormController.getForms) //working on
router.post('/admin/form',FormController.addForm) //working on
router.put('/admin/form',FormController.updateForm)
router.delete('/admin/form',FormController.deleteForm)

router.get('/behaviorForm',FormController.getBehaviorForms)
router.post('/admin/behaviorForm',FormController.addBehaviorForms)
router.put('/admin/behaviorForm',FormController.updateBehaviorForm)
router.delete('/admin/behaviorForm',FormController.deleteBehaviorForm)

router.get('/facts',FactController.getFacts)
router.post('/admin/fact',FactController.addFact)
router.put('/admin/fact',FactController.updateFact)
router.delete('/admin/fact',FactController.deleteFact)


module.exports = router;