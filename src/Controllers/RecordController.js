
const RecordProvider = require("../Components/RecordProvider")

class RecordController {

    static async getRecord(req,res){
        const result = await RecordProvider.getPatientRecord(req.headers.authorization)
        return res.json(result)
    }

    static getRecords(req,res){
        const result = RecordProvider.getPatientRecords()
        return res.json(result)
    }

    static async addRecord(req,res){
        const result = await RecordProvider.addSubRecord(req.body,req.headers.authorization,req.params.sub_record)

        return res.json(result)
    }

    // static async addPatientWeight(req,res){
    //     const result = RecordProvider.add_weight_records(req.body,req.headers.authorization)
    //     res.json(result)
    // }

    // static async addPatientWeight(req,res){
    //     const result = RecordProvider.add_blood_pressure_records(req.body,req.headers.authorization)
    //     res.json(result)
    // }
    // static async addPatientWeight(req,res){
    //     const result = RecordProvider.add_behavior_records(req.body,req.headers.authorization)
    //     res.json(result)
    // }
    // static async addPatientWeight(req,res){
    //     const result = RecordProvider.add_Hba1c_records(req.body,req.headers.authorization)
    //     res.json(result)
    // }
    // static async addPatientWeight(req,res){
    //     const result = RecordProvider.add_Hba1c_records(req.body,req.headers.authorization)
    //     res.json(result)
    // }

    

    static deleteRecord(req,res){
        const token = req.headers.authorization 
        const result = RecordProvider.testToken(token)
        res.json(result) 
    }
}

module.exports = RecordController

