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
      .then(() => {
        navigate("/tasks");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLoginSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    loginWithGoogle()
      .then(() => {
        navigate("/tasks");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>Login</h1>
      <div style={{ marginBottom: 5 }}>
        Enter Username
        <input type="text" onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div style={{ marginBottom: 10 }}>
        Enter password
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button style={{ marginBottom: 5 }} onClick={handleNormalLoginSubmit}>
        Sign in
      </button>
      <button style={{ marginBottom: 5 }} onClick={handleGoogleLoginSubmit}>
        Sign in with with Google
      </button>
      <Link to="/signup">Create account</Link>
    </form>
  );
};

export default LoginComponent;
