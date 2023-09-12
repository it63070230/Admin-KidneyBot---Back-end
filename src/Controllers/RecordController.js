
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

    static async addRecord(req,res){
        const result = RecordProvider.addPatientRecord(req.body)
        return await res.json(result)
    }

    static async add_weight_records(req,res){
        const result = RecordProvider.add_weight_records(req.body,req.headers.authorization)
        res.json(result)
    }

    static deleteRecord(req,res){
        const token = req.headers.authorization 
        const result = RecordProvider.testToken(token)
        res.json(result) 
    }
}

module.exports = RecordController

