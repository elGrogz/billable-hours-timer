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
      <div>
        {user?.user ? (
          <button
            onClick={() => {
              signOutFromGoogle();
              navigate("/");
            }}
          >
            Sign out!
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default TaskContainer;
