
const recordTestData = require("../Data/RecordTestData.json")

class RecordRepository {

    static getRecords() {
        return recordTestData
    }

    static getRecord(record_id) {
        const result = recordTestData.find( ({ id }) => id === record_id );
        return result
    }

    static addRecord(record) {
        recordTestData.push(record)
        return recordTestData
    }

    static deleteRecord(id) {
        
    }
}

module.exports = RecordRepository