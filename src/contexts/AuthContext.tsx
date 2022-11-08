import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebase";

interface ContextProps {
  children: React.ReactNode;
}

type AppUser = User | null;
// type ContextState = { user: AppUser };

const userAuthContext = createContext<User | null>(null);

export const UserAuthContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AppUser>(null);
  // const value = { user };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state changed: ", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={user}>{children}</userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
