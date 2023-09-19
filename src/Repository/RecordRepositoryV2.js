const {initializeApp} = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc } = require("firebase/firestore");
const recordTestData = require("../Data/RecordTestData.json")




class RecordRepositoryV2 {

    static async getAllPatientCollection(){
        const db = require('../Data/db')

        const recordRef = collection(db, "Patient");
        const result = await getDocs(recordRef)

        let result_array = []

        for(let i = 0; i < result.docs.length; i++){
            console.log(i)
            result_array.push(result.docs[i].data())
            // result_array.push(i.data())
        }
        
        return result_array
    }

    static async getRecords(id) {
        const db = require('../Data/db')

        const recordRef = doc(db, "Record", id);
        const result = await getDoc(recordRef)
        
        return result.data()
    }

    static deleteRecord(id) {
        
    }

    static async addSubRecord(id,sub_name,record){
        const db = require('../Data/db')

        const recordRef = doc(db, "Record", id);

        var add_object = {};
        add_object[sub_name] = arrayUnion(record);

        const res = await updateDoc(recordRef, add_object);

        return res
    }

}

module.exports = RecordRepositoryV2