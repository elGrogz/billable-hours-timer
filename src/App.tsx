import React, { useState } from "react";
import Task from "./components/Task";
import logo from "./logo.svg";
import "./App.css";

interface Task {
  name: string;
  time: number;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addNewTask = (): void => {
    const blankTask: Task = {
      name: "hello",
      time: 0,
    };

    let tempTasks = [...tasks];
    tempTasks.push(blankTask);
    setTasks(tempTasks);
    console.log(tasks);
  };

  const removeTask = (task: Task) => {
    const indexToUpdate = tasks.indexOf(task);
    let tempTasks = [...tasks];
    tempTasks.splice(indexToUpdate, 1);
    setTasks(tempTasks);
  };

  // const startTimer = () => {};

  return (
    <div>
      <button onClick={() => addNewTask()}>Add new task</button>
      <div>
        {tasks.length > 0
          ? tasks.map((task, index) => (
              <Task
                key={index}
                name={task.name}
                time={task.time}
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
