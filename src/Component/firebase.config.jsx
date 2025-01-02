// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArk4F5WUzCDHmJQKNNtgY7Ud9OLhMhHus",
  authDomain: "real-time-chatting-appli-45590.firebaseapp.com",
  projectId: "real-time-chatting-appli-45590",
  storageBucket: "real-time-chatting-appli-45590.firebasestorage.app",
  messagingSenderId: "116736651202",
  appId: "1:116736651202:web:f83e176cc48652dd05305b",
  measurementId: "G-6N8VV95EK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;