const {initializeApp} = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion } = require("firebase/firestore");
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

    static async addSubRecord(collection_name,id,sub_name,record){
        const db = require('../Data/db')

        // console.log(collection_name)
        // console.log(id)
        // console.log(sub_name)
        // console.log(record)
        const recordRef = doc(db, collection_name, id);
        // const recordRef = doc(db, Patient, "wfM1upWMTDtmDASCEa1W", sub_name, record);

        var add_object = {};
        add_object[sub_name] = arrayUnion(record);

        const res = await updateDoc(recordRef, add_object);

        return res
    }

}

module.exports = RecordRepository