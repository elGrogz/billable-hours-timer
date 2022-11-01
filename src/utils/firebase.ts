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
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getDatabase, get, ref, set, child } from "firebase/database";
import { TaskType } from "../types/TaskType";
import { resolve } from "path";
import { UserType } from "../types/UserType";

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
const database = getDatabase(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): UserType | undefined => {
  try {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("result", result);
        const user = result.user;
        const userUid = result.user.uid;
        const userDisplayName = result.user.displayName;
        const userEmail = result.user.email;
        const userPhotoUrl = result.user.photoURL;

        get(child(ref(database), `users/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log("snapshot: ", snapshot.val());

            return {
              userDisplayName,
              userEmail,
              userPhotoUrl,
            };
          } else {
            console.log("No data available");
            console.log("user displayname: ", userDisplayName);
            console.log("user email: ", userEmail);
            console.log("user photo: ", userPhotoUrl);
            set(ref(database, `users/${userUid}`), {
              displayName: userDisplayName,
              email: userEmail,
              photoUrl: userPhotoUrl,
            });

            return {
              userDisplayName,
              userEmail,
              userPhotoUrl,
            };
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error: any) {
    console.error(error);
    alert(error.message);
    return undefined;
  }
};

export const writeTaskData = (task: TaskType) => {
  set(ref(database, "tasks/" + task.id), {
    name: task.name,
    time: task.time,
  });
};

export const removeTaskData = (task: TaskType) => {
  set(ref(database, "tasks/" + task.id), null);
};
