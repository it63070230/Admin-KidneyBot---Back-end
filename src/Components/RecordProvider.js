
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

    static async add_weight_records(record,token){
        try {
            const id = TokenChecker.isTokenValid(token).id
            const sub_name = "weight_records"
            const collection_name = "Patient"
            const result = RecordRepository.addSubRecord(collection_name,id,sub_name,record)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async add_blood_pressure_records(){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async add_behavior_records(){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async add_Hba1c_records(){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async add_eGFR_records(){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = RecordProvider