import { useState } from "react";
import { Link } from "react-router-dom";
import { createAccount } from "../utils/firebase";

const SignupComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    try {
      await createAccount(email, password);
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
      <div>
        Re-enter password
        <input type="password" />
      </div>
      {error && <h2>Error! {error}</h2>}
      <Link to="/">Click here to login normally</Link>
      <button onClick={handleSubmit}></button>
    </form>
  );
};

export default SignupComponent;
