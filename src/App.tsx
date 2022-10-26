import React, { useState } from "react";
import Task from "./components/Task";
import logo from "./logo.svg";
import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

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
// const analytics = getAnalytics(app);

function writeTaskData(task: any) {
  set(ref(database, "tasks/" + task.id), {
    name: task.name,
    time: task.time,
  });
}

function App() {
  const [tasks, setTasks] = useState<{}[]>([]);

  const addNewTask = (): void => {
    const blankTask: {} = {
      id: Date.now(),
      name: "",
      time: 0,
    };

    let tempTasks = [...tasks];
    tempTasks.push(blankTask);
    setTasks(tempTasks);
    writeTaskData(blankTask);
  };

  const removeTask = (task: {}) => {
    const indexToUpdate = tasks.indexOf(task);
    console.log(indexToUpdate);
    let tempTasks = [...tasks];
    tempTasks.splice(indexToUpdate, 1);
    setTasks(tempTasks);
  };

  return (
    <div>
      <button onClick={() => addNewTask()}>Add new task</button>
      <div>
        {tasks.length > 0
          ? tasks.map((task, index) => (
              <Task
                key={index}
                handleRemoveTask={() => {
                  removeTask(task);
                }}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
