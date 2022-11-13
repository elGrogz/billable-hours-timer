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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "inline-flex",
          alignItems: "center",
          alignSelf: "center",
          flexDirection: "column",
          padding: 5,
          border: "medium solid black",
          borderRadius: 5,
          boxShadow: "4px 4px 2px 1px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1>Signup</h1>
        <div style={{ marginBottom: 5 }}>
          Choose username
          <input
            style={{ marginLeft: 5 }}
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          Choose password
          <input
            style={{ marginLeft: 5 }}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 5 }}>{error}</div>}
        <button style={{ marginBottom: 5 }} onClick={handleSubmit}>
          Submit
        </button>
        <Link to="/">Back to Login</Link>
      </form>
    </div>
  );
};

export default SignupComponent;
