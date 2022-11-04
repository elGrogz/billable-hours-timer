// import {
//   signInWithGoogle,
//   writeTaskData,
//   removeTaskData,
// } from "./utils/firebase";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginToAccount, signInWithGoogle } from "../utils/firebase";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    try {
      await loginToAccount(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

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
        <input type="text" onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        Enter password
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Sign in</button>
      <button onClick={signInWithGoogle}>Sign in with with Google</button>
      <Link to="/signup">Click here for for old school signup</Link>
    </form>
  );
};

export default LoginComponent;
