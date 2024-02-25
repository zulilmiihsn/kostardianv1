import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMTZkDiihaf518z3YjsAt2i3rxjQ2riU8",
  authDomain: "kost-ardian-bcc4b.firebaseapp.com",
  projectId: "kost-ardian-bcc4b",
  storageBucket: "kost-ardian-bcc4b.appspot.com",
  messagingSenderId: "1030984609014",
  appId: "1:1030984609014:web:273ec57decd81c7f9a10d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
