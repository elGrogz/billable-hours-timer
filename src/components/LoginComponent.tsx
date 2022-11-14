import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginToAccount, loginWithGoogle } from "../utils/firebase";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [googleButtonHoverState, setGoogleButtonHoverState] =
    useState<boolean>(false);

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

  const handleGoogleMouseEnter = () => {
    setGoogleButtonHoverState(true);
  };

  const handleGoogleMouseLeave = () => {
    setGoogleButtonHoverState(false);
  };

  return (
    <div
      style={{
        display: "flex", // make the container a block flex container. Block means every element starts on a new line and margin a
        justifyContent: "center", // aligns the items in the center of the main axis (row/horizontal in this case)
        alignItems: "center", // sets the alignment of the crossaxis (column/veritical in this case) of all child items
        height: "100vh", // the container takes up 100% of the viewport
      }}
    >
      <form
        style={{
          display: "flex", // makes it a block flex container
          flexDirection: "column", // makes the items arrange vertically on top of each other
          alignItems: "center", // makes the children elements arrange themselves in the center of the cross axis
          padding: 5,
          border: "medium solid black",
          borderRadius: 5,
          boxShadow: "4px 4px 2px 1px rgba(0, 0, 0, 0.2)",
          backgroundColor: "white",
        }}
      >
        <h1>Login</h1>
        <div style={{ marginBottom: 5 }}>
          Enter username
          <input
            style={{ marginLeft: 5 }}
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          Enter password
          <input
            style={{ marginLeft: 5 }}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 5 }}>{error}</div>}
        <button style={{ marginBottom: 5 }} onClick={handleNormalLoginSubmit}>
          Sign in
        </button>
        <div
          style={{
            marginBottom: 5,
            backgroundColor: googleButtonHoverState ? "tomato" : "white",
            margin: 10,
            padding: 10,
            border: "medium solid black",
            borderRadius: 5,
            boxShadow: "4px 4px 2px 1px rgba(0, 0, 0, 0.2)",
          }}
          onMouseEnter={handleGoogleMouseEnter}
          onMouseLeave={handleGoogleMouseLeave}
          onClick={handleGoogleLoginSubmit}
        >
          Sign in with with Google
        </div>
        <Link to="/signup">Create account</Link>
      </form>
    </div>
  );
};

export default LoginComponent;
