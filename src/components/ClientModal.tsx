import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useUserAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";

interface ContextProps {
  closeModal: () => void;
}

// const addNewTask = async () => {
//   const newTask: TaskType = {
//     key: Date.now(),
//     name: newTaskName,
//     time: 0,
//   };

//   writeTaskData(newTask, user);
//   setNewTaskName("");
// };

const ClientModal: React.FC<ContextProps> = ({ closeModal }) => {
  const [clientName, setClientName] = useState<string>("string");

  const user = useUserAuth();

  const addNewClient = async () => {
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        client: clientName,
        userId: user?.uid,
      });
      console.log("Client doc written with id: ", docRef.id);
    } catch (error) {
      console.error("Error adding client doc: ", error);
    }

    setClientName("");
    closeModal();
  };

  return (
    <div>
      Enter Client name:
      <input
        type="text"
        onChange={(event) => setClientName(event.target.value)}
      />
      <button onClick={addNewClient}>Add Client</button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ClientModal;
