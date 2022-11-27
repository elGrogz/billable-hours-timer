import { useUserAuth } from "../contexts/AuthContext";

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
  const addNewClient = async () => {};

  const auth = useUserAuth();

  return (
    <div>
      Enter Client name:
      <input type="text" />
      <button onClick={addNewClient}>Add Client</button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ClientModal;
