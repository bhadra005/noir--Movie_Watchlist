import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyB8onW2UOyPfIpptQEJjxQsXC76w4oBFS0",
    authDomain: "movie-watchlist-961c5.firebaseapp.com",
    projectId: "movie-watchlist-961c5",
    storageBucket: "movie-watchlist-961c5.firebasestorage.app",
    messagingSenderId: "349860189660",
    appId: "1:349860189660:web:7b5dd4a155b916a01a6b19"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);