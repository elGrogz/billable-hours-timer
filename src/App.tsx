import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaskContainer from "./components/TaskContainer";
import SignupComponent from "./components/SignupComponent";
import LoginComponent from "./components/LoginComponent";
import { useUserAuth, UserAuthContextProvider } from "./contexts/AuthContext";
import { signOutFromGoogle } from "./utils/firebase";

const App = () => {
  const user = useUserAuth();

  return (
    <div>
      <UserAuthContextProvider>
        <button onClick={signOutFromGoogle}>Sign out!</button>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/tasks" element={<TaskContainer />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
};

export default App;
