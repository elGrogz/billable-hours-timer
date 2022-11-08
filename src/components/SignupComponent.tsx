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
        display: "inline-flex",
        flexDirection: "column",
        marginTop: 5,
        marginBottom: 20,
      }}
    >
      Signup
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
      {error && <div style={{ color: "red" }}>Error! {error}</div>}
      <button onClick={handleSubmit}>Submit username and password</button>
      <Link to="/">Click here to login normally</Link>
    </form>
  );
};

export default SignupComponent;
