const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc,query,where,deleteDoc } = require("firebase/firestore")
const db = require('../Data/db')

class FormRepository{

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
        try {
            // Get the current ID counter
            const counterRef = doc(db, "counters", "behaviorFormId");
            const counterDoc = await getDoc(counterRef);
            const currentId = counterDoc.exists() ? counterDoc.data().value : 0;

            await setDoc(doc(db, "Form", currentId.toString()), formData);

            await setDoc(counterRef, { value: currentId + 1 });

            return formData;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getBehaviorForms(){
        const q = query(collection(db, "Form"));
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