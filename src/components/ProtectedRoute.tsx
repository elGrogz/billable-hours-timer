import { Navigate } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";

interface ContextProps {
  // tells the props will just have one attribute called children, which is a ReactNode
  children: React.ReactNode;
}

// takes in the children, which are child react components
const ProtectedRoute: React.FC<ContextProps> = ({ children }) => {
  // subscribes to the user auth context, which is either null or a User object
  let auth = useUserAuth();
  if (!auth) {
    console.log("Yer nae logged in pal: ", auth);
    // if no auth, use the router navigation method to back to the home screen so the user can log in again
    return <Navigate to="/" />;
  }

  // returns the child components
  return <div>{children}</div>;
};

export default ProtectedRoute;
