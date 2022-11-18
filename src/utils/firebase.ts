// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
} from "firebase/auth";
import { getDatabase, get, ref, set, child, update } from "firebase/database";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { TaskType } from "../types/TaskType";
import { v4 as uuidv4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbumExMpRIX_RZleVb1jXtJ4E0ccCe1bM",
  authDomain: "billable-hours-timer.firebaseapp.com",
  projectId: "billable-hours-timer",
  storageBucket: "billable-hours-timer.appspot.com",
  messagingSenderId: "78473279696",
  appId: "1:78473279696:web:0fa08cba0f726d207e06d5",
  measurementId: "G-BSPFV6QLYY",
  databaseURL:
    "https://billable-hours-timer-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = (): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("result", result);
        const user = result.user;

        resolve(user);
      })
      .catch((error) => {
        console.log("Error logging in with google: ", error);
        reject(error);
      });
  });
};

export const createAccount = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("result", result);
        const user = result.user;

        resolve(user);
      })
      .catch((error) => {
        console.log("Error creating normal user:", error);
        reject(error);
      });
  });
};

export const loginToAccount = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const signOutFromGoogle = async () => {
  await signOut(auth);
};

export const writeTaskData = async (task: TaskType, user: User | null) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      name: task.name,
      time: task.time,
      userId: user?.uid,
    });
    console.log("Doc written with id: ", docRef.id);
  } catch (error) {
    console.error("Error adding task doc: ", error);
  }
};

export const removeTaskData = (task: TaskType) => {};
