
const RecordRepository = require('../Repository/RecordRepository')

class RecordProvider {

    static getPatientRecord(id){
        try {
            return RecordRepository.getRecord(Number(id))
        } catch (error) {
            console.log(error)
        }
    }

    static getPatientRecords(){
        try {
            return RecordRepository.getRecords()
        } catch (error) {
            console.log(error)
        }
    }

    static addPatientRecord(record){
        try {
            return RecordRepository.addRecord(record)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = RecordProvider