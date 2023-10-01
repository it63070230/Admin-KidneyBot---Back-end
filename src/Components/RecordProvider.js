
const RecordRepository = require('../Repository/RecordRepository')
const TokenChecker = require('./TokenChecker')

class RecordProvider {

    static async getPatientRecords(token){
        try {

            const deToken = TokenChecker.isTokenValid(token)

            if(deToken == null){
                console.log("here")
                return null
            }

            console.log(deToken.id)

            const result = await RecordRepository.getRecords(deToken.id)
            
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

    static async addRecord(token,record){
        try {

            const id = TokenChecker.isTokenValid(token).id

            if(id == null){
                return null
            }

            const result = await RecordRepository.addRecord(record.form_id, id, record.answer, record.created_at,false)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async updateRecord(token,reqBody){
        const deToken = await TokenChecker.isTokenValid(token)
        if(deToken == null){
            return null
        }

        const { id , answer} = reqBody
        const result = await RecordRepository.updateRecord(id,answer)
        return result
    }

    static async deleteRecord(token,reqBody){

        const deToken = await TokenChecker.isTokenValid(token)
        if(deToken == null){
            return null
        }

        const { id } = reqBody
        const result = await RecordRepository.deleteRecord(id)
        return result
    }

    static async addBehaviorRecord(token,record){
        const id = TokenChecker.isTokenValid(token).id

        if(id == null){
            return null
        }

        const result = await RecordRepository.addRecord(record.form_id, id, record.answer, record.created_at,true)
        return result
    }

}

module.exports = RecordProvider