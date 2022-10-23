import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface Task {
  name: string;
  time: number;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addNewTask = () => {
    const blankTask: Task = {
      name: "hello",
      time: 0,
    };

    let tempTasks = [...tasks];
    tempTasks.push(blankTask);
    setTasks(tempTasks);
  };

  const removeTask = (task: Task) => {
    const indexToUpdate = tasks.indexOf(task);
    let tempTasks = [...tasks];
    tempTasks.splice(indexToUpdate, 1);
    setTasks(tempTasks);
  };

  return (
    <div>
      <button onClick={() => addNewTask()}>Add new task</button>
      <div>
        {tasks.map((task, index) => (
          <div className="flex justify-center" key={index}>
            <div>
              {task.name} {index}
            </div>
            <button onClick={() => removeTask(task)}>Remove task</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
