import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB9Ocz8jtw2W5CIvYeZCNrLX6OX51BSAYU",
    authDomain: "fitai-app-c9651.firebaseapp.com",
    projectId: "fitai-app-c9651",
    storageBucket: "fitai-app-c9651.firebasestorage.app",
    messagingSenderId: "98925406884",
    appId: "1:98925406884:android:5d0a01751ee2b5e8d01431"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);