import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaskContainer from "./components/TaskContainer";
import SignupComponent from "./components/SignupComponent";
import LoginComponent from "./components/LoginComponent";
import { UserAuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div
      style={{
        backgroundColor: "tomato",
      }}
    >
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskContainer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
};

export default App;
