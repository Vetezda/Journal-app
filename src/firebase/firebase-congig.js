import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDS9TAC0Q5jJX-dqPB7-SjyYs-bAlvRgCM",
    authDomain: "react-app-curso-f3834.firebaseapp.com",
    projectId: "react-app-curso-f3834",
    storageBucket: "react-app-curso-f3834.appspot.com",
    messagingSenderId: "1009948842441",
    appId: "1:1009948842441:web:432e55fffa7cbbe446f018"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);  

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();//para autenticar con Google

export {
    db,
    googleAuthProvider,
    firebase
}

