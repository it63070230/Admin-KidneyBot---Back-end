
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

    static deleteRecord(req,res){
        const token = req.headers.authorization 
        const result = RecordProvider.testToken(token)
        res.json(result) 
    }
}

module.exports = RecordController

{
    "id": 1,
    "username": "p1",
    "password": "pass",
    "sex": "Female",
    "date_of_birth": "1985-03-20",
    "weight_records": [
      {
        "weight": 62.0,
        "timestamp": "2023-09-01T08:30:00Z"
      }
    ],
    "blood_pressure_records": [
      {
        "systolic": 120,
        "diastolic": 80,
        "timestamp": "2023-09-03T11:45:00Z"
      }
    ],
    "behavior_records": [
      {
        "question": "Do you exercise regularly?",
        "response": "Yes",
        "timestamp": "2023-09-01T16:00:00Z"
      }
    ]
  }