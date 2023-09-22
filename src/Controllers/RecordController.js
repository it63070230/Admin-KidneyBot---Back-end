
const RecordProvider = require("../Components/RecordProvider")

class RecordController {


    static async getRecords(req,res){
        const result = await RecordProvider.getPatientRecords(req.headers.authorization)
        return res.json(result)
    }

    static async adminGetRecords(req,res){
        const result = await RecordProvider.adminGetRecords(req.headers.authorization, req.body)
        return res.json(result)
    }


    static async addRecord(req,res){
        const result = await RecordProvider.addSubRecord(req.body,req.headers.authorization)

        return res.json(result)
    }

    static deleteRecord(req,res){
        const token = req.headers.authorization 
        const result = RecordProvider.testToken(token)
        res.json(result) 
    }
}

module.exports = RecordController

