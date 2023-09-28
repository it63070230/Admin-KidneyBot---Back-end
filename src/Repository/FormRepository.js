const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc,query,where } = require("firebase/firestore")
const db = require('../Data/db')

class FormRepository{

    static async addForm(formData){
        
        const res = await addDoc(collection(db, "Form"), formData);

        return res
    }

    static async getBehaviorForms(){
        const q = query(collection(db, "Form"), where("is_behavior", "==", true));
        const result = await getDocs(q);
        
        let dataResult = []

        result.forEach((doc) => {
            const temp = {
                "id" : doc.id,
                "question" : doc.data().question
            }
            dataResult.push(temp)
        });

        return dataResult
    }

    // static async addBehavior(addedFormID){
    //     console.log(addedFormID)
    //     const res = await addDoc(collection(db, "Behavior"), addedFormID);

    //     return res
    // }
}

module.exports = FormRepository;