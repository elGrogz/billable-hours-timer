// interface ContextProps {
//   handleClose: () => void;
//   show: boolean;
//   children: React.ReactNode;
// }

const ClientModal: React.FC<any> = (
  props
  // handleClose,
  // show,
  // children,
) => {
  // const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div>
      Hello
      <button onClick={props.closeModal}>Close</button>
    </div>
  );
};

export default ClientModal;
