import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA0fKrmFm1zgvzEUkj1CIJkiCVu1_Vx-sw",

  authDomain: "fir-auth-f04a2.firebaseapp.com",

  projectId: "fir-auth-f04a2",

  storageBucket: "fir-auth-f04a2.appspot.com",

  messagingSenderId: "790819951715",

  appId: "1:790819951715:web:15283ffd49b6cd62e85456",

  measurementId: "G-52RHX85QVX"

  
  };
  
  
  // Initialize Firebase
  
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage= getStorage(app);