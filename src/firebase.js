import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register a user
export const register = async (email, password, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName });
    toast.success("Account created Successfully!");
    return false;
  } catch (err) {
    toast.error(err.message.replace("Firebase:", ""));
    return true;
  }
};

// Login a user
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in Successfully!");
    return false;
  } catch (err) {
    toast.error(err.message.replace("Firebase:", ""));
    return true;
  }
};

// Signout a user
export const logout = ()=>{
    signOut(auth)
    toast.success("Logged out Successfully!");
}

// Sign in with google account

export const signUpProvider = async()=>{
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    toast.success("Logged in Successfully!");
}

// Forget Password 
export const forgetPassword = async(email)=>{
    try{
        await sendPasswordResetEmail(auth, email)
        toast.success("Please Check Your Email Box!");
    }catch(err){
        toast.error(err.message.replace("Firebase:", ""));
    }
}

// User observer
export const userObserver = (setCurrentUser)=>{
    onAuthStateChanged(auth, (user)=>{
        if(user) setCurrentUser(user)
        else setCurrentUser(null)
    })
}