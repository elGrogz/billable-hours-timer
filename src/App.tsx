import { useState } from "react";
import Task from "./components/Task";
import "./App.css";
import { TaskType } from "./types/TaskType";
import {
  signInWithGoogle,
  writeTaskData,
  removeTaskData,
} from "./utils/firebase";
import { User } from "firebase/auth";
import { isUser } from "./types/UserType";
import { Routes, Route } from "react-router-dom";
import TaskContainer from "./components/TaskContainer";

const App = () => {
  return (
    <div>
      {/* <Routes> */}
      {/* <Route path="/" element={<LoginComponent />} />
        <button onClick={handleSignInWithGoogle}>Sign in!</button>
        <button onClick={() => addNewTask()}>Add new task</button> */}
      <TaskContainer />
      {/* </Routes> */}
    </div>
  );
};

export default App;
