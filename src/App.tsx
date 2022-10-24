import React, { useState } from "react";
import Task from "./components/Task";
import logo from "./logo.svg";
import "./App.css";

// interface Task {
//   name: string;
//   time: number;
// }

function App() {
  const [tasks, setTasks] = useState<{}[]>([]);

  const addNewTask = (): void => {
    const blankTask: {} = {};

    let tempTasks = [...tasks];
    tempTasks.push(blankTask);
    setTasks(tempTasks);
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
