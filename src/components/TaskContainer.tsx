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
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const user = useUserAuth();
  const navigate = useNavigate();

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <UserHeader />
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
