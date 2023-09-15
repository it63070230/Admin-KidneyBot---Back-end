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

    static async findAdmins(username){
    
        const q = query(collection(db, "Admin"), where("username", "==", username));
        const result = await getDocs(q);
        return result
    }

    static async findAdminStaff(username){
    
        const q = query(collection(db, "Admin"), where("username", "==", username));
        const result = await getDoc(q);
        return result
    }

    static async addAdminStaff(patient_info){

        const res = await addDoc(collection(db, "Admin"), patient_info);

        const docRef = doc(db, "Admin", res.id);
        const docRes = await getDoc(docRef);

        var resResult = docRes.data()

        delete resResult.password
        
        const result = resResult

        return result
    }
}

module.exports = AuthRepository