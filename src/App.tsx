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
      {/* Wraps the app in the User Auth provider, which means any children components can use the data in the provider 
        without passing props down. Good for things that should be known globally - Auth, language, theme
      */}
      <UserAuthContextProvider>
        {/* Routes need to be wrapped in this component */}
        <Routes>
          {/* route route - loads the login component */}
          <Route path="/" element={<LoginComponent />} />
          {/* loads the signup component */}
          <Route path="/signup" element={<SignupComponent />} />
          {/* loads the tasks route */}
          <Route
            path="/tasks"
            // tells the router what component(s) to render
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
