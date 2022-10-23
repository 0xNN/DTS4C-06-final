// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl9E5_4CiC3JHHc5aduShtNAY_aRzoJm4",
  authDomain: "dts4c-react-final.firebaseapp.com",
  projectId: "dts4c-react-final",
  storageBucket: "dts4c-react-final.appspot.com",
  messagingSenderId: "928506154403",
  appId: "1:928506154403:web:bc8a6134aea9eee7289e16",
  measurementId: "G-K2ZSZRB5MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
