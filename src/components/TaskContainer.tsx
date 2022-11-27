import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";
import { TaskType } from "../types/TaskType";
import { db, writeTaskData } from "../utils/firebase";
import ClientModal from "./ClientModal";
import Task from "./Task";
import UserHeader from "./UserHeader";
import Modal from "react-modal";
import ReactModal from "react-modal";

const TaskContainer = () => {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useUserAuth();
  const navigate = useNavigate();

  const handleTaskNameChange = (name: string): void => {
    setNewTaskName(name);
  };

  const openClientModal = () => {
    setShowModal(true);
  };

  const closeClientModal = () => {
    setShowModal(false);
  };

  const addNewTask = async () => {
    const newTask: TaskType = {
      key: Date.now(),
      name: newTaskName,
      time: 0,
    };

    writeTaskData(newTask, user);
    setNewTaskName("");
  };

  useEffect(() => {
    Modal.setAppElement("#root");

    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", user?.uid)
    );
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      let tasksArray: any[] = [];
      snapshot.forEach((doc) => {
        tasksArray.push({ ...doc.data(), id: doc.id });
      });
      setTaskList(tasksArray);
    });

    return () => unsubscribe();

    // https://blog.openreplay.com/build-a-crud-app-with-react-and-firebase/
  }, []);

  useEffect(() => {
    console.table(taskList);
  }, [taskList]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Modal
        isOpen={showModal}
        onRequestClose={closeClientModal}
        style={{ content: { maxWidth: "25%", maxHeight: "25%" } }}
      >
        <ClientModal closeModal={closeClientModal} />
      </Modal>
      <UserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <h3>New taskname: </h3>
        <input
          style={{
            maxHeight: 30,
          }}
          maxLength={25}
          onChange={(event) => handleTaskNameChange(event.target.value)}
          placeholder="Enter task name..."
        />
        <button onClick={openClientModal}>Add new client</button>
      </div>
      <button
        style={{ alignSelf: "center", marginBlock: 10 }}
        onClick={addNewTask}
      >
        Add new task
      </button>
      <div>
        {taskList && taskList.length > 0
          ? taskList.map((task, index) => <Task key={index} data={task} />)
          : null}
      </div>
    </div>
  );
};

export default TaskContainer;
