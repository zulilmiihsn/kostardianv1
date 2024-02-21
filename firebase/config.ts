import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDesVh0JLyNkaPY16_qLZZZax2iVjr3-k0",
  authDomain: "kost-ardian-dd813.firebaseapp.com",
  projectId: "kost-ardian-dd813",
  storageBucket: "kost-ardian-dd813.appspot.com",
  messagingSenderId: "616078708191",
  appId: "1:616078708191:web:f0cc1aed8a45e6a1f2486a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
