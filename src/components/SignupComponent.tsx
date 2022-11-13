import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../utils/firebase";

const SignupComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setError("");
    createAccount(email, password)
      .then((response) => {
        console.log("response from signup: ", response);
        navigate("/tasks");
      })
      .catch((error) => {
        console.log("Error submitting normal user", error);
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
      <h1>Signup</h1>
      <div style={{ marginBottom: 5 }}>
        Choose username
        <input type="text" onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div style={{ marginBottom: 10 }}>
        Choose password
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error && <div style={{ color: "red", marginBottom: 5 }}>{error}</div>}
      <button style={{ marginBottom: 5 }} onClick={handleSubmit}>
        Submit
      </button>
      <Link to="/">Back to login</Link>
    </form>
  );
};

export default SignupComponent;
