import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCyeJe3p4ScFSnoar1v0zbLDT8VY_txLcQ",

  authDomain: "ai-interview-assistant-b619f.firebaseapp.com",

  projectId: "ai-interview-assistant-b619f",

  storageBucket: "ai-interview-assistant-b619f.firebasestorage.app",

  messagingSenderId: "1017191687267",

  appId: "1:1017191687267:web:71c121d9c11079c8218456",

  measurementId: "G-TH6EMD40PS"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;