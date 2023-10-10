const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const {
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  getDoc,
  query,
  where,
} = require('firebase/firestore');

const db = require('../Data/db');

class ProfileRepository {
  static async getAllProfiles() {
    const profileRef = collection(db, 'Patient');
    const result = await getDocs(profileRef);

    let result_array = [];

    for (let i = 0; i < result.docs.length; i++) {
      result_array.push(result.docs[i].data());
    }

    return result_array;
  }

  static async getProfileByEmail(email) {
    const q = query(collection(db, 'Patient'), where('email', '==', email));
    const result = await getDocs(q);

    if (result.docs.length === 0) {
      return null; // Patient not found
    }

    return result.docs[0].data();
  }

  static async updateProfile(email, newData) {
    const q = query(collection(db, 'Patient'), where('email', '==', email));
    const result = await getDocs(q);

    if (result.docs.length === 0) {
      return null; // Patient not found
    }

    const profileDocRef = result.docs[0].ref;
    await updateDoc(profileDocRef, newData);

    return newData;
  }

  static async deleteProfile(email) {
    const q = query(collection(db, 'Patient'), where('email', '==', email));
    const result = await getDocs(q);

    if (result.docs.length === 0) {
      return null; // Patient not found
    }

    const profileDocRef = result.docs[0].ref;
    await deleteDoc(profileDocRef);

    return 'Deleted';
  }

  static async addProfile(profileData) {
    await addDoc(collection(db, 'Patient'), profileData);

    return profileData;
  }
}

module.exports = ProfileRepository;