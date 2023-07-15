// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV7rQvykm1dBXtcAxjyeew4zU8Wv_R0l0",
  authDomain: "expense-tracker-3138f.firebaseapp.com",
  projectId: "expense-tracker-3138f",
  storageBucket: "expense-tracker-3138f.appspot.com",
  messagingSenderId: "477194959360",
  appId: "1:477194959360:web:b0ecdc7665113c487276e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);