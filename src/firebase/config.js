// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Mayank firebase 
const firebaseConfig = {
 
//   apikey: process.env.REACT_APP_APIKEY,
// authDomain: process.env.REACT_APP_AUTHDOMAIN,
// projectId: process.env.REACT_APP_PROJECTID,
// storageBucket: process.env.REACT_APP_STORAGEBUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
// appId: process.env.REACT_APP_APPID,
// measurementId: process.env.REACT_APP_MEASUREMENTID
 
apiKey: "AIzaSyD9WvxfIzHYvLeoPugxIT-ZkoAW-OVbovE",
authDomain: "student-dashboard-570ff.firebaseapp.com",
projectId: "student-dashboard-570ff",
storageBucket: "student-dashboard-570ff.firebasestorage.app",
messagingSenderId: "765450964379",
appId: "1:765450964379:web:ff403af8342768ae27253e",
measurementId: "G-Z5ZBQDCYH4"
};

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  