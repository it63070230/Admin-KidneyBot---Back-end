const ProfileController = require('../Controllers/ProfileController')
const RecordController = require('../Controllers/RecordController')
const AuthenticationController = require('../Controllers/AuthenticationController')
const express = require('express');
const FormController = require('../Controllers/FormController');

const router = express.Router()

// router.get('/record/',RecordController.getRecord)
router.get('/records',RecordController.getRecords)
router.get('/admin/query-records',RecordController.adminQueryRecords);
router.post('/record/:sub_record',RecordController.addSubRecord)
router.post('/admin/record/:sub_record',RecordController.adminAddSubRecord);
router.put('/record/:sub_record', RecordController.updateSubRecord);
router.delete('/record/:sub_record', RecordController.deleteSubRecord);

router.post('/signup',AuthenticationController.signup)
router.post('/signin',AuthenticationController.signin)
router.post('/admin/signin',AuthenticationController.adminSignin)
router.post('/admin/addstaff',AuthenticationController.adminSignup)

router.get('/profile', ProfileController.getUserProfile);
router.put('/profile', ProfileController.updateUserProfile);
router.get('/admin/profile', ProfileController.adminGetProfiles);

router.get('/admin/behaviorForm',FormController.getBehaviorForms)
router.post('/admin/behaviorForm',FormController.addBehaviorForms)
router.put('/admin/behaviorForm',FormController.updateBehaviorForm)
router.delete('/admin/behaviorForm',FormController.deleteBehaviorForm)

module.exports = router;