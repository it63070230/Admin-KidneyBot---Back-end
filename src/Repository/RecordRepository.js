const {initializeApp} = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const { doc, setDoc,collection, addDoc } = require("firebase/firestore");
const recordTestData = require("../Data/RecordTestData.json")




class RecordRepository {

    // Get a list of cities from your database
    

    static getRecords() {
        return recordTestData
    }

    static getRecord(record_id) {

        const result = recordTestData.find( ({ id }) => id === record_id );
        return result
    }

    static async addRecord(record) {
        const db = require('../Data/db')
        console.log(record)
        const res = await addDoc(collection(db, "Record"), record);
        console.log(res.id)
    }

    static deleteRecord(id) {
        
    }

}

module.exports = RecordRepository