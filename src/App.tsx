import { useState } from "react";
import Task from "./components/Task";
import "./App.css";
import { TaskType } from "./types/TaskType";
import {
  signInWithGoogle,
  writeTaskData,
  removeTaskData,
} from "./utils/firebase";

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const addNewTask = (): void => {
    const blankTask: TaskType = {
      id: Date.now(),
      name: "",
      time: 0,
    };

    let tempTasks = [...tasks];
    tempTasks.push(blankTask);
    setTasks(tempTasks);
    writeTaskData(blankTask);
  };

  const removeTask = (task: TaskType) => {
    const indexToUpdate = tasks.indexOf(task);
    let tempTasks = [...tasks];
    tempTasks.splice(indexToUpdate, 1);
    setTasks(tempTasks);
    removeTaskData(task);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in!</button>
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
};

export default App;
