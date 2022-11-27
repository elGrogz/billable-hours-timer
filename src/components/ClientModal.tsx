interface ContextProps {
  handleClose: () => void;
  show: boolean;
  children: React.ReactNode;
}

const ClientModal: React.FC<ContextProps> = ({
  handleClose,
  show,
  children,
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default ClientModal;
