// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf0ng5d4L_AnEzGzYKBT9gheeTrKG6OI8",
  authDomain: "pantrydb-b282a.firebaseapp.com",
  projectId: "pantrydb-b282a",
  storageBucket: "pantrydb-b282a.appspot.com",
  messagingSenderId: "593717615827",
  appId: "1:593717615827:web:36b517eb342264335d4826"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export{app, firestore};