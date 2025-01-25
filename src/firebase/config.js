// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdauwUWmgn5WRMkdqZl4p4xbeUEV4aEMU",
  authDomain: "madrocket-technologies.firebaseapp.com",
  projectId: "madrocket-technologies",
  storageBucket: "madrocket-technologies.firebasestorage.app",
  messagingSenderId: "272651673675",
  appId: "1:272651673675:web:0dd1f0e0e9266191ac6dce",
  measurementId: "G-69287F49T2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
