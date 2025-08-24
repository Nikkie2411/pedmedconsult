// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4IFbgNv-IUCeGyJHS3W3CIJ8B-FwUn6A",
  authDomain: "pedmedconsult.firebaseapp.com",
  projectId: "pedmedconsult",
  storageBucket: "pedmedconsult.firebasestorage.app",
  messagingSenderId: "360956002515",
  appId: "1:360956002515:web:bb54fd2f4796a47bab9426",
  measurementId: "G-7G3FQVL0XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
