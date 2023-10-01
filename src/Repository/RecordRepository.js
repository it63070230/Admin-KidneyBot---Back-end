const {initializeApp} = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const { doc, deleteDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc, query,where } = require("firebase/firestore");
const recordTestData = require("../Data/RecordTestData.json")

const db = require('../Data/db')


class RecordRepository {

    static async getAllPatientCollection(){

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
        

        console.log(id)

        const q = query(collection(db, "Record"), where("patient_id", "==", id), );
        const result = await getDocs(q);

        let dataResult = []

        result.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dataResult.push(doc.data())
        });
        
        return dataResult
    }

    static async updateRecord(id,answer){
        const formRef = doc(db, "Record", id);

        await updateDoc(formRef, {
            answer: answer
        });

        const result = {"answer" : answer}

        return result
    }

    static async deleteRecord(id) {
        await deleteDoc(doc(db, "Record", id));

        return "Deleted"
    }

    static async addSubRecord(collection_name,id,sub_name,record){

        const recordRef = doc(db, collection_name, id);

        var add_object = {};
        add_object[sub_name] = arrayUnion(record);

        const res = await updateDoc(recordRef, add_object);

        return res
    }

    static async addRecord(formID,userID,answer,createdAt,isBehavior){

        const addRecord = {
            "form_id" : formID,
            "patient_id" : userID,
            "answer" : answer,
            "created_at" : createdAt,
            "is_behavior" : isBehavior
        }

        await addDoc(collection(db, "Record"), addRecord);

        return addRecord
    }

}

module.exports = RecordRepository