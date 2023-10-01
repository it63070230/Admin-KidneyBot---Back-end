const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc,query,where,deleteDoc } = require("firebase/firestore")
const db = require('../Data/db')

class FormRepository{

    static async getForms(){
        const q = query(collection(db, "Form"), where("is_behavior", "==", false));
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

    static async updateForm(id,question){
        const formRef = doc(db, "Form", id);

        await updateDoc(formRef, {
            question: question
        });

        return {"question" : question}
    }

    static async deleteForm(id){
        await deleteDoc(doc(db, "Form", id));

        return "Deleted"
    }

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

}

module.exports = FormRepository;