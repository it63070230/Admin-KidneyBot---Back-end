const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
const dotenv = require('dotenv');
dotenv.config();

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyAVMInO8vhW9JnoB2V-tga5Az5NlD3M1bg",
  authDomain: "kidneybot-734f4.firebaseapp.com",
  projectId: "kidneybot-734f4",
  storageBucket: "kidneybot-734f4.appspot.com",
  messagingSenderId: "638159419",
  appId: "1:638159419:web:03bd72e232217e83056a1e",
};

// console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db
