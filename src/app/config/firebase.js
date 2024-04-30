// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8d3Yx1HXgjnn-wwsC0T3vFfj3V2ow0oU",
  authDomain: "earthcare-b24df.firebaseapp.com",
  projectId: "earthcare-b24df",
  storageBucket: "earthcare-b24df.appspot.com",
  messagingSenderId: "751239954697",
  appId: "1:751239954697:web:11276db4752982301853d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider
export const db = getFirestore(app)