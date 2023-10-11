const { collection, query, where, getDocs, addDoc, setDoc, getDoc,doc } = require("firebase/firestore");
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
        try {
            const counterRef = doc(db, "counters", "patientCounter");
            const counterDoc = await getDoc(counterRef);
            const currentId = counterDoc.exists() ? counterDoc.data().value : 1;
    
            const newDocRef = doc(db, "Patient", currentId.toString());
            await setDoc(newDocRef, patient_info);
    
            await setDoc(counterRef, { value: currentId + 1 });
    
            const docRes = await getDoc(newDocRef);
            const resResult = docRes.data();
    
            delete resResult.password;
    
            return resResult;
        } catch (error) {
            console.error(error);
            throw error;
        }
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

    static async addAdminStaff(admin_info){
        try {
            const counterRef = doc(db, "counters", "adminCounter");
            const counterDoc = await getDoc(counterRef);
            const currentId = counterDoc.exists() ? counterDoc.data().value : 1;
    
            const newDocRef = doc(db, "Admin", currentId.toString());
            await setDoc(newDocRef, admin_info);
    
            await setDoc(counterRef, { value: currentId + 1 });
    
            const docRes = await getDoc(newDocRef);
            const resResult = docRes.data();
    
            delete resResult.password;
    
            return resResult;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = AuthRepository