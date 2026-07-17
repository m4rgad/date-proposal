// firebase.ts

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "m4rgad-flying.firebaseapp.com",
  projectId: "m4rgad-flying",
  storageBucket: "m4rgad-flying.firebasestorage.app",
  messagingSenderId: "155752745659",
  appId: "1:155752745659:web:583f8f4a07e7ca7df1379e",
  measurementId: "G-89WDFPR87P"
};


const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);