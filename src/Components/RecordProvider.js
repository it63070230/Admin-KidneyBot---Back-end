
const RecordRepository = require('../Repository/RecordRepository')
const TokenChecker = require('./TokenChecker')

class RecordProvider {

    static async getPatientRecord(token){
        try {

            const id = TokenChecker.isTokenValid(token).id

            if(id == null){
                return null
            }
            
            return await RecordRepository.getRecord(id)
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

    static async addSubRecord(record,token,record_name){
        try {

            const sub_record_list = ["weight_records","blood_pressure_records","behavior_records","Hba1c_records","eGFR_records"]


            if(!(sub_record_list.includes(record_name))){
                return null
            }

            const id = TokenChecker.isTokenValid(token).id

            if(id == null){
                return null
            }

            const collection_name = "Patient"

            const result = await RecordRepository.addSubRecord(collection_name,id,record_name,record)
            return result
        } catch (error) {
            console.log(error)
        }
    }

        // static async addPatientRecord(record){
    //     try {
    //         return await RecordRepository.addRecord(record)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    static testToken(token){
        try {
            const result = TokenChecker.isTokenValid(token)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    // static async add_weight_records(record,token){
    //     try {
    //         const id = TokenChecker.isTokenValid(token).id
    //         const sub_name = "weight_records"
    //         const collection_name = "Patient"
    //         const result = RecordRepository.addSubRecord(collection_name,id,sub_name,record)
    //         return result
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // static async add_blood_pressure_records(record,token){
    //     try {
    //         const id = TokenChecker.isTokenValid(token).id
    //         const sub_name = "blood_pressure_records"
    //         const collection_name = "Patient"
    //         const result = RecordRepository.addSubRecord(collection_name,id,sub_name,record)
    //         return result
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // static async add_behavior_records(){
    //     try {
    //         const id = TokenChecker.isTokenValid(token).id
    //         const sub_name = "behavior_records"
    //         const collection_name = "Patient"
    //         const result = RecordRepository.addSubRecord(collection_name,id,sub_name,record)
    //         return result
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // static async add_Hba1c_records(){
    //     try {
    //         const id = TokenChecker.isTokenValid(token).id
    //         const sub_name = "Hba1c_records"
    //         const collection_name = "Patient"
    //         const result = RecordRepository.addSubRecord(collection_name,id,sub_name,record)
    //         return result
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // static async add_eGFR_records(){
    //     try {
    //         const id = TokenChecker.isTokenValid(token).id
    //         const sub_name = "eGFR_records"
    //         const collection_name = "Patient"
    //         const result = RecordRepository.addSubRecord(collection_name,id,sub_name,record)
    //         return result
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

module.exports = RecordProvider