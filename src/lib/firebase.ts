// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDC6b4jpO2R_WjAn6aiiehgvwyb5lZ5u0w",
  authDomain: "studio-2888462696-2958d.firebaseapp.com",
  projectId: "studio-2888462696-2958d",
  storageBucket: "studio-2888462696-2958d.appspot.com",
  messagingSenderId: "556931533786",
  appId: "1:556931533786:web:bf804d5cd96c3429880ee3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
