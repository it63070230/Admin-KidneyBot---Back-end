const { doc, setDoc,collection, addDoc, updateDoc,arrayUnion, getDocs, getDoc } = require("firebase/firestore")
const db = require('../Data/db')

class FormRepository{

    static async addForm(formData){

        const res = await addDoc(collection(db, "Form"), formData);

        console.log(res)

        return res.doc.data()
    }
}

module.exports = FormRepository;