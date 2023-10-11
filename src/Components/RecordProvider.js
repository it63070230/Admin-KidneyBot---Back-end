
const RecordRepository = require('../Repository/RecordRepository')
const TokenChecker = require('./TokenChecker')

class RecordProvider {

    static async getPatientRecords(token) {
        try {

            const deToken = TokenChecker.isTokenValid(token)

            if (deToken == null) {
                return null
            }

            const result = await RecordRepository.getRecords(deToken.id)

            const selectedFields = {
                blood_pressure_records: result.blood_pressure_records,
                weight_records: result.weight_records,
                eGFR_records: result.eGFR_records,
                Hba1c_records: result.Hba1c_records,
                behavior_records: result.behavior_records,
            };

            const isAllFieldsUndefined = Object.values(selectedFields).every(value => value === undefined);
            const isAllFieldsEmpty = Object.values(selectedFields).every(value => Array.isArray(value) && value.length === 0);

            if (isAllFieldsUndefined || isAllFieldsEmpty) {
                return 'no data available';
            } else {
                return selectedFields;
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async adminGetRecords(token) {
        try {

            const detoken = TokenChecker.isTokenValid(token)

            if (detoken.id == null || detoken.is_admin == false) {
                return null
            }
            return await RecordRepository.getAllPatientCollection()
        } catch (error) {
            console.log(error)
        }
    }

    static async addSubRecord(record, token, record_name) {
        try {
            const sub_record_list = ["weight_records", "blood_pressure_records", "behavior_records", "Hba1c_records", "eGFR_records"]
            if (!(sub_record_list.includes(record_name))) {
                return null
            }
            const id = TokenChecker.isTokenValid(token).id
            if (id == null) {
                return null
            }
            const collection_name = "Patient"
            const result = await RecordRepository.addSubRecord(collection_name, id, record_name, record)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async addRecord(token, record) {
        try {

            const id = TokenChecker.isTokenValid(token).id

            if (id == null) {
                return null
            }

            const result = await RecordRepository.addRecord(record.form_id, id, record.answer, record.created_at, false)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async updateRecord(token, reqBody) {
        const deToken = await TokenChecker.isTokenValid(token)
        if (deToken == null) {
            return null
        }

        const { id, answer } = reqBody
        const result = await RecordRepository.updateRecord(id, answer)
        return result
    }

    static async deleteRecord(token, reqBody) {

        const deToken = await TokenChecker.isTokenValid(token)
        if (deToken == null) {
            return null
        }

        const { id } = reqBody
        const result = await RecordRepository.deleteRecord(id)
        return result
    }

    static async addBehaviorRecord(token, record) {
        const id = TokenChecker.isTokenValid(token).id

        if (id == null) {
            return null
        }

        const result = await RecordRepository.addRecord(record.form_id, id, record.answer, record.created_at, true)
        return result
    }

}

module.exports = RecordProvider