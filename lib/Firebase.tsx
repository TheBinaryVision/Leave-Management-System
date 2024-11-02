// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log(process.env.API_KEY)
const firebaseConfig = {
  apiKey: "AIzaSyBtiLjyoTynKI31myuA7cwU_Rz3Mh4Gfb0",
  authDomain: "leave-system-d8a98.firebaseapp.com",
  projectId: "leave-system-d8a98",
  storageBucket: "leave-system-d8a98.appspot.com",
  messagingSenderId: "253592020976",
  appId: process.env.APPID,
  measurementId: "G-W481KSD9L3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Get a non-default Storage bucket
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

