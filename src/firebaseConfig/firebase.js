
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAylbhoZ1oSD33NbNPPcx81adlBAt6MMEg",
  authDomain: "fir-testing-b5808.firebaseapp.com",
  projectId: "fir-testing-b5808",
  storageBucket: "fir-testing-b5808.appspot.com",
  messagingSenderId: "1005158102743",
  appId: "1:1005158102743:web:f3e41d6a764ed156e72292",
  measurementId: "G-194FZT529D"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)