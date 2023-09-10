const { collection, query, where, getDocs, addDoc, getDoc,doc } = require("firebase/firestore");
const db = require('../Data/db')

class AuthRepository{

    static async findPatients(email){
    
        const q = query(collection(db, "Patient"), where("email", "==", email));
        const result = await getDocs(q);
        return result
    }

    static async findPatient(email){
    
        const q = query(collection(db, "Patient"), where("email", "==", email));
        const result = await getDoc(q);
        return result
    }

    static async addPatient(patient_info){

        const res = await addDoc(collection(db, "Patient"), patient_info);

        const docRef = doc(db, "Patient", res.id);
        const docRes = await getDoc(docRef);

        var resResult = docRes.data()

        delete resResult.password
        
        const result = resResult

        return result
    }
}

module.exports = AuthRepository