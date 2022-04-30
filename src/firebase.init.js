// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj6-HWWSh_EsAOC1JR3WuYZ5lv5gecnyg",
  authDomain: "genius-car-services-proj-1d320.firebaseapp.com",
  projectId: "genius-car-services-proj-1d320",
  storageBucket: "genius-car-services-proj-1d320.appspot.com",
  messagingSenderId: "491521488208",
  appId: "1:491521488208:web:25950629cdbd07ea2fa855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;