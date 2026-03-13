import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjAdRN-Ip9l960wbOHOUUlrbzm2zbDfgk",
  authDomain: "abi-nails.firebaseapp.com",
  projectId: "abi-nails",
  storageBucket: "abi-nails.firebasestorage.app",
  messagingSenderId: "670672449870",
  appId: "1:670672449870:web:92b99e795e281741cc2e1f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

