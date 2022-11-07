import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaskContainer from "./components/TaskContainer";
import SignupComponent from "./components/SignupComponent";
import LoginComponent from "./components/LoginComponent";
import { UserAuthContextProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <UserAuthContextProvider>
      <Routes>
        {/* {user ? ( */}
        <Route path="/tasks" element={<TaskContainer />} />
        {/* ) : ( */}
        <Route path="/" element={<LoginComponent />} />
        {/* )} */}
        <Route path="/signup" element={<SignupComponent />} />
      </Routes>
    </UserAuthContextProvider>
  );
};

export default App;
