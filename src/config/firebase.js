// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNEv4SyGV20S_FylBExK1-d-9GtpRPGbM",
  authDomain: "diplomado-saas.firebaseapp.com",
  projectId: "diplomado-saas",
  storageBucket: "diplomado-saas.firebasestorage.app",
  messagingSenderId: "372883862834",
  appId: "1:372883862834:web:d1fc20b19600830948932b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);