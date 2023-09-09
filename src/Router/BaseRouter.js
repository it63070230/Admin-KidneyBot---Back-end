const AdminController = require('../Controllers/AdminController')
const RecordController = require('../Controllers/RecordController')

const express = require('express')

const router = express.Router()

router.get('/records',RecordController.getRecords)
router.get('/record/:id',RecordController.getRecord)
router.post('/record/add',RecordController.addRecord)



module.exports = router;