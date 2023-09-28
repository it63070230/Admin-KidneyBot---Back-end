
const RecordRepository = require('../Repository/RecordRepository')
const RecordRepositoryV2 = require('../Repository/RecordRepositoryV2')
const TokenChecker = require('./TokenChecker')

class RecordProvider {

    // static async getPatientRecord(token){
    //     try {

    //         const id = TokenChecker.isTokenValid(token).id

    //         if(id == null){
    //             return null
    //         }
            
    //         return await RecordRepository.getRecords(id)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    static async getPatientRecords(token){
        try {

            const detoken = TokenChecker.isTokenValid(token)
            const result = await RecordRepository.getRecords(detoken.id)
            
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async adminGetRecords(token,body){
        try {

            const detoken = TokenChecker.isTokenValid(token)

            if(detoken.id == null || detoken.is_admin == false){
                return null
            }
            return await RecordRepository.getRecords(body.user_id)
        } catch (error) {
            console.log(error)
        }
    }

    static async addSubRecord(record,token){
        try {

            const id = TokenChecker.isTokenValid(token).id

            if(id == null){
                return null
            }

            const result = await RecordRepositoryV2.addRecord(record.form_id, id, record.answer, record.created_at,false)
            return result
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

    static async deleteRecord(token,body,subRecordName){
        try {
            
            const decordedToken = await TokenChecker.isTokenValid(token)
            if(decordedToken.is_admin == false){
                return null
            }

            const {  } = body



        } catch (error) {
            console.log(error)
        }
    }

    static async addBehaviorRecord(token,record){
        const id = TokenChecker.isTokenValid(token).id

        if(id == null){
            return null
        }

        const result = await RecordRepositoryV2.addRecord(record.form_id, id, record.answer, record.created_at,true)
        return result
    }

}

module.exports = RecordProvider