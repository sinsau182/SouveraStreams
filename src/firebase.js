import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3DC8YJBfQo-EWnkbji1csIOU61OGHPnQ",
  authDomain: "mastermine-c55c8.firebaseapp.com",
  projectId: "mastermine-c55c8",
  storageBucket: "mastermine-c55c8.appspot.com",
  messagingSenderId: "327919176767",
  appId: "1:327919176767:web:d0df45be857e5af9ee3c8a",
  measurementId: "G-J4F9P8S16H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;