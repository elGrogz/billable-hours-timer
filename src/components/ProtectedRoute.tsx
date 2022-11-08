import { Navigate } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";

interface ContextProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ContextProps> = ({ children }) => {
  let auth = useUserAuth();
  if (!auth) {
    console.log("Yer nae logged in pal");
    return <Navigate to="/" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
