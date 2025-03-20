import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
   onAuthStateChanged, signOut, GoogleAuthProvider,
    signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore,
  doc,
  collection ,
  addDoc,
  getDocs,
  setDoc,
  deleteDoc, query,
  orderBy, updateDoc, where, onSnapshot,
  

 } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyBFb0tlFdx9Lz4BnVJEn35yGbLzFCQ5fnY",
    authDomain: "blog-web-9dd12.firebaseapp.com",
    projectId: "blog-web-9dd12",
    storageBucket: "blog-web-9dd12.firebasestorage.app",
    messagingSenderId: "1034621404227",
    appId: "1:1034621404227:web:4440b01d95e2adbf42c0f6"
  };




  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);



  export { auth,
    createUserWithEmailAndPassword,
     signInWithEmailAndPassword, 
     onAuthStateChanged,
      signOut,
       GoogleAuthProvider, 
       signInWithPopup,
       db ,
       collection ,
       doc,
       addDoc,
       setDoc,
       getDocs,
       query,
   orderBy,updateDoc,
   where,
   onSnapshot,
   deleteDoc

   
 };