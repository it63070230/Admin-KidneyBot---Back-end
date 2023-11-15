const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const { doc, deleteDoc, collection, addDoc, updateDoc, arrayUnion, getDocs, getDoc, setDoc, query, where } = require("firebase/firestore");

const db = require('../Data/db')


class RecordRepository {

    static async getRecordsForPatients(patientIds, lineIds, recordTypes) {
        const recordRef = collection(db, "Patient");
        const result = await getDocs(recordRef);

        const patientRecords = [];
        result.docs.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            const lineId = data.lineId;

            const filteredData = {
                id,
                lineId
            };

            recordTypes.forEach(type => {
                filteredData[type] = data[type] || [];
            });

            if (patientIds != null) {
                if (patientIds.includes(id)) {
                    patientRecords.push(filteredData);
                }
            }
            if (lineIds != null) {
                if (lineIds.includes(lineId)) {
                    patientRecords.push(filteredData);
                }
            }
        });
        return patientRecords;
    }

    static async getRecordsForAllPatients(recordTypes) {
        const recordRef = collection(db, "Patient");
        const result = await getDocs(recordRef);

        const patientRecords = [];
        result.docs.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            const lineId = data.lineId;

            const filteredData = {
                id,
                lineId
            };

            recordTypes.forEach(type => {
                filteredData[type] = data[type] || [];
            });

            patientRecords.push(filteredData);
        });
        return patientRecords;
    }

    static async getAllPatientCollection() {

        const recordRef = collection(db, "Patient");
        const result = await getDocs(recordRef)

        let result_array = []

        result.docs.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            result_array.push({ id, ...data });
        });

        return result_array;
    }

    static async getRecords(id) {

        const recordRef = doc(db, "Patient", id);
        const result = await getDoc(recordRef)

        return result.data()
    }

    static async addSubRecord(collection_name, id, sub_name, record) {
        const recordRef = doc(db, collection_name, id);
        var add_object = {};
        add_object[sub_name] = arrayUnion(record);

        if ( record !== undefined ) {
            await updateDoc(recordRef, add_object);
            return true
        }        
    }

    static async updateSubRecord(collection_name, id, subRecordIndex, sub_record, data) {
        const docRef = doc(db, collection_name, id);

        try {
            const docSnapshot = await getDoc(docRef);
        
            if (docSnapshot.exists()) {
                const currentData = docSnapshot.data();

                if (
                    currentData[sub_record][subRecordIndex] !== undefined
                ) {
                    currentData[sub_record][subRecordIndex] = data;
       
                    await setDoc(docRef, currentData);
                    return true;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteSubRecord(collection_name, id, subRecordIndex, sub_record) {
        const docRef = doc(db, collection_name, id);

        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            return null;
        }

        if (
            Array.isArray(docSnapshot.data()[sub_record]) &&
            subRecordIndex >= 0 &&
            subRecordIndex < docSnapshot.data()[sub_record].length
          ) {
            const newArray = docSnapshot.data()[sub_record].filter((_, index) => index !== subRecordIndex);
          
            await updateDoc(docRef, { [sub_record]: newArray });
            return true;
        }

    }
}

module.exports = RecordRepository