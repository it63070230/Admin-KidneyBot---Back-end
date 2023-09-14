const {initializeApp} = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc } = require("firebase/firestore");
const recordTestData = require("../Data/RecordTestData.json")




class RecordRepository {

    // Get a list of cities from your database
    

    static async getRecords() {
        const db = require('../Data/db')

        const q = query(collection(db, "Patient"), where("email", "==", email));
        const result = await getDocs(q);
        return result

    }

    static async getRecord(id) {
        const db = require('../Data/db')

        console.log(id)

        const recordRef = doc(db, "Patient", id);
        const result = await getDoc(recordRef)
        
        return result.data()
    }

    // static async addRecord(record) {
    //     const db = require('../Data/db')
    //     console.log(record)
    //     const res = await addDoc(collection(db, "Record"), record);
    //     console.log(res.id)
    // }

    static deleteRecord(id) {
        
    }

    static async addSubRecord(collection_name,id,sub_name,record){
        const db = require('../Data/db')

        const recordRef = doc(db, collection_name, id);

        var add_object = {};
        add_object[sub_name] = arrayUnion(record);

        // console.log(collection_name)
        // console.log(id)
        // console.log(sub_name)
        // console.log(record)

        const res = await updateDoc(recordRef, add_object);

        return res
    }

}

module.exports = RecordRepository