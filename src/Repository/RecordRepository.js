const {initializeApp} = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc, query,where } = require("firebase/firestore");
const recordTestData = require("../Data/RecordTestData.json")




class RecordRepository {

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

        // const recordRef = doc(db, "Record", id);
        // const result = await getDoc(recordRef)

        const q = query(collection(db, "Record"), where("patient_id", "==", id));
        const result = await getDocs(q);

        let dataResult = []

        result.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dataResult.push(doc.data())
        });
        
        return dataResult
    }

    static updateRecord(){
        
    }

    static deleteRecord(id) {
        
    }

    static async addSubRecord(collection_name,id,sub_name,record){
        const db = require('../Data/db')

        const recordRef = doc(db, collection_name, id);

        var add_object = {};
        add_object[sub_name] = arrayUnion(record);

        const res = await updateDoc(recordRef, add_object);

        return res
    }

}

module.exports = RecordRepository