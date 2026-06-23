import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhSQQB1pyeICbbnsggAJAKmL0Sox6_8S4",
  authDomain: "expense-tracker-cce56.firebaseapp.com",
  projectId: "expense-tracker-cce56",
  storageBucket: "expense-tracker-cce56.firebasestorage.app",
  messagingSenderId: "483974152981",
  appId: "1:483974152981:web:e048bc5d90d7e92098df1c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);