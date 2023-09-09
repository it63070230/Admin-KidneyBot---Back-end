
const RecordProvider = require("../Components/RecordProvider")

class RecordController {

    static getRecord(req,res){
        const result = RecordProvider.getPatientRecord(req.params.id)
        return res.json(result)
    }

    static getRecords(req,res){
        const result = RecordProvider.getPatientRecords()
        return res.json(result)
    }

    static addRecord(req,res){
        const result = RecordProvider.addPatientRecord(req.body)
        return res.json(result)
    }

    static deleteRecord(){

    }
}

module.exports = RecordController