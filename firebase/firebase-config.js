// Import Firebase core, auth, and firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbH8aVGZl-dIHdw2ZJueRbu4Too3t-DNA",
  authDomain: "kindraiser-7ee73.firebaseapp.com",
  projectId: "kindraiser-7ee73",
  storageBucket: "kindraiser-7ee73.appspot.com",
  messagingSenderId: "146191388840",
  appId: "1:146191388840:web:b47e0bbb6934045665329d",
  measurementId: "G-5LHFQYF0P5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

