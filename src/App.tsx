import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import TaskContainer from "./components/TaskContainer";
import SignupComponent from "./components/SignupComponent";
import LoginComponent from "./components/LoginComponent";
import { useUserAuth, UserAuthContextProvider } from "./contexts/AuthContext";
import { signOutFromGoogle } from "./utils/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./utils/firebase";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state changed: ", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // const user = useUserAuth();

  return (
    <div>
      <UserAuthContextProvider>
        <div>
          {user && <button onClick={signOutFromGoogle}>Sign out!</button>}
        </div>
        <Routes>
          {user ? (
            <Route path="/tasks" element={<TaskContainer />} />
          ) : (
            <Route path="/" element={<LoginComponent />} />
          )}
          <Route path="/signup" element={<SignupComponent />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
};

export default App;
