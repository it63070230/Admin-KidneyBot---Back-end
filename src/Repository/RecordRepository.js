const {initializeApp} = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc } = require("firebase/firestore");
const recordTestData = require("../Data/RecordTestData.json")




class RecordRepository {

    // Get a list of cities from your database
    

    // static async getRecords() {
    //     const db = require('../Data/db')

    //     const q = query(collection(db, "Patient"), where("email", "==", email));
    //     const result = await getDocs(q);
    //     return result

    // }

    static async getAllPatientCollection(){
        const db = require('../Data/db')

        const recordRef = collection(db, "Patient");
        const result = await getDocs(recordRef)

        let result_array = []

        // result.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());

        //   });

        

        for(let i = 0; i < result.docs.length; i++){
            console.log(i)
            result_array.push(result.docs[i].data())
            // result_array.push(i.data())
        }
        
        return result_array
    }

    static async getRecords(id) {
        const db = require('../Data/db')

        const recordRef = doc(db, "Patient", id);
        const result = await getDoc(recordRef)
        
        return result.data()
    }

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