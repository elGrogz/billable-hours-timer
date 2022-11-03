// import {
//   signInWithGoogle,
//   writeTaskData,
//   removeTaskData,
// } from "./utils/firebase";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form
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
      <Link to="/signup">Click here for for old school signup</Link>
    </form>
  );
};

export default LoginComponent;
