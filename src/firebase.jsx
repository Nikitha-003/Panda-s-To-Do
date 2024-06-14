
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCMVb43nH7eec9lsSgBRuUckC_-JbNvC-0",
  authDomain: "pandas-to-do.firebaseapp.com",
  projectId: "pandas-to-do",
  storageBucket: "pandas-to-do.appspot.com",
  messagingSenderId: "533029520441",
  appId: "1:533029520441:web:d2040fa13b38f9ded3f9e8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth()
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

export {auth , provider , db}