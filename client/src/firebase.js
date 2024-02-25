// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-login-7330e.firebaseapp.com",
  projectId: "mern-login-7330e",
  storageBucket: "mern-login-7330e.appspot.com",
  messagingSenderId: "1020820598400",
  appId: "1:1020820598400:web:4afa09d8a1854ac2ffc065"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);