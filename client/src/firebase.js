// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAivtmV6IVaZKdXXxij-7rAZ7fdnj9PfFQ",
  authDomain: "anecdot-78e4f.firebaseapp.com",
  projectId: "anecdot-78e4f",
  storageBucket: "anecdot-78e4f.appspot.com",
  messagingSenderId: "376679548491",
  appId: "1:376679548491:web:d106bbf5985df2046a2fce",
  measurementId: "G-Y5QD05XBGC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
