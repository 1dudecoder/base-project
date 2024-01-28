import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,  } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA3lxPTIQ6_WxaztywfKYWSUHKhrpOf4oI",
  authDomain: "base-assign.firebaseapp.com",
  projectId: "base-assign",
  storageBucket: "base-assign.appspot.com",
  messagingSenderId: "675283366030",
  appId: "1:675283366030:web:a99e42a9f033e959c5d9df",
  measurementId: "G-MXJKH9JR03",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };
