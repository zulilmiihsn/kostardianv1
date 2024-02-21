import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs9xaRHQUjEVwuLvSlCX532Fo23tr7xNY",
  authDomain: "kost-ardian-a21ae.firebaseapp.com",
  projectId: "kost-ardian-a21ae",
  storageBucket: "kost-ardian-a21ae.appspot.com",
  messagingSenderId: "334669991205",
  appId: "1:334669991205:web:8fdfc074cbe2322c2e1ecc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
