
const RecordProvider = require("../Components/RecordProvider")

class RecordController {


    static async getRecords(req,res){
        const result = await RecordProvider.getPatientRecords(req.headers.authorization)
        return res.json(result)
    }

    static async adminGetRecords(req,res){
        const result = await RecordProvider.adminGetRecords(req.headers.authorization)
        return res.json(result)
    }


    static async addRecord(req,res){
        
        const result = await RecordProvider.addRecord(req.headers.authorization,req.body)

        return res.json(result)
    }

    static async addSubRecord(req,res){

        const result = await RecordProvider.addSubRecord(req.body,req.headers.authorization,req.params.sub_record)

        return res.json(result)
    }

    static async updateRecord(req,res){
        const result = await RecordProvider.updateRecord(req.headers.authorization,req.body)
        res.json(result) 
    }

    static async deleteRecord(req,res){
        const result = await RecordProvider.deleteRecord(req.headers.authorization,req.body)
        res.json(result) 
    }

    static async addBehaviorRecord(req,res){
        try {
            const result = RecordProvider.addBehaviorRecord(req.headers.authorization,req.body)
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = RecordController

