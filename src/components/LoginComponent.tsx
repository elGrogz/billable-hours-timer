// import {
//   signInWithGoogle,
//   writeTaskData,
//   removeTaskData,
// } from "./utils/firebase";

const LoginComponent = () => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        marginTop: 5,
      }}
    >
      Login
      <div>
        Enter Username
        <input type="text" />
      </div>
      <div>
        Enter password
        <input type="password" />
      </div>
      <button>Click here for Google fun</button>
      <button>Click here for for old school signup</button>
    </div>
  );
};

export default LoginComponent;
