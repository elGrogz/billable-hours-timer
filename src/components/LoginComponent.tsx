// import {
//   signInWithGoogle,
//   writeTaskData,
//   removeTaskData,
// } from "./utils/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginToAccount, loginWithGoogle } from "../utils/firebase";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleNormalLoginSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    loginToAccount(email, password)
      .then((response) => {
        navigate("/tasks");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLoginSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    try {
      await loginWithGoogle();
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
      <button onClick={handleNormalLoginSubmit}>Sign in</button>
      <button onClick={handleGoogleLoginSubmit}>
        Sign in with with Google
      </button>
      <Link to="/signup">Click here for for old school signup</Link>
      {error && <div style={{ color: "red" }}>OH NO! {error}</div>}
    </form>
  );
};

export default LoginComponent;
