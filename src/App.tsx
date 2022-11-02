import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaskContainer from "./components/TaskContainer";
import SignupComponent from "./components/SignupComponent";
import LoginComponent from "./components/LoginComponent";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/tasks" element={<TaskContainer />} />
      </Routes>
    </div>
  );
};

export default App;
