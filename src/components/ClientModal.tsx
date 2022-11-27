interface ContextProps {
  closeModal: () => void;
}

const ClientModal: React.FC<ContextProps> = ({ closeModal }) => {
  return (
    <div>
      Hello
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ClientModal;
