
const RecordProvider = require("../Components/RecordProvider")

class RecordController {

    static async getRecord(req,res){
        const result = await RecordProvider.getPatientRecord(req.headers.authorization)
        return res.json(result)
    }

    static async getRecords(req,res){
        const result = await RecordProvider.getPatientRecords(req.authorization)
        return res.json(result)
    }

    static async adminGetRecords(req,res){
        const result = await RecordProvider.adminGetRecord(req.headers.authorization)
        return res.json(result)
    }


    static async addRecord(req,res){
        const result = await RecordProvider.addSubRecord(req.body,req.headers.authorization,req.params.sub_record)

        return res.json(result)
    }

    static deleteRecord(req,res){
        const token = req.headers.authorization 
        const result = RecordProvider.testToken(token)
        res.json(result) 
    }
}

module.exports = RecordController

