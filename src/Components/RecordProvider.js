
const RecordRepository = require('../Repository/RecordRepository')
const TokenChecker = require('./TokenChecker')

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

    static async addPatientRecord(record){
        try {
            return await RecordRepository.addRecord(record)
        } catch (error) {
            console.log(error)
        }
    }

    static testToken(token){
        try {
            const result = TokenChecker.isTokenValid(token)
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = RecordProvider