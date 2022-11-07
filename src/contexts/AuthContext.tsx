import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebase";

interface ContextProps {
  children: React.ReactNode;
}

type AppUser = User | null;
type ContextState = { user: AppUser };

const userAuthContext = createContext<ContextState | null>(null);

export const UserAuthContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AppUser>(null);
  const value = { user };

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
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};

// const AuthContext = ({ children }) => {
//   const [user, setUser] = useState({});

//   // function to do google auth and get user data back from firebase
//   const handleSignInWithGoogle = async () => {
//     console.log("ONE");
//     const response = await signInWithGoogle();
//     console.log("TWO");

// if (isUser(response)) {
//   console.log("THREE");
//   setDisplayName(response.displayName);
//   console.log("FOUR");
// }
// };

// return (
// <UserAuthContext.Provider value={{ user, handleSignInWithGoogle }}>
//   {children}
// </UserAuthContext.Provider>
// );
// };
