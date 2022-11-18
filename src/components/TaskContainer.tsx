import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";
import { TaskType } from "../types/TaskType";
import {
  removeTaskData,
  signOutFromGoogle,
  writeTaskData,
} from "../utils/firebase";
import Task from "./Task";
import UserHeader from "./UserHeader";

const TaskContainer = () => {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const user = useUserAuth();
  const navigate = useNavigate();

  const handleTaskNameChange = (name: string): void => {
    setNewTaskName(name);
  };

  const addNewTask = (): void => {
    const newTask: TaskType = {
      key: Date.now(),
      name: newTaskName,
      time: 0,
    };

    let tempTasks = [...tasks]; // change this to fetch tasks from database
    tempTasks.push(newTask);
    setTasks(tempTasks);
    writeTaskData(newTask, user);
    setNewTaskName("");
  };

  const removeTask = (task: TaskType) => {
    const indexToUpdate = tasks.indexOf(task);
    let tempTasks = [...tasks];
    tempTasks.splice(indexToUpdate, 1);
    setTasks(tempTasks);
    removeTaskData(task);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <UserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <h2>New taskname: </h2>
        <input
          maxLength={25}
          onChange={(event) => handleTaskNameChange(event.target.value)}
          placeholder="Enter task name..."
        />
      </div>
      <button
        style={{ alignSelf: "center", marginBlock: 10 }}
        onClick={() => addNewTask()}
      >
        Add new task
      </button>
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

export default TaskContainer;
