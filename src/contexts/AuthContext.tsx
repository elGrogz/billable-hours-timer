import { createContext, useContext, useEffect, useState } from "react";
// import { signInWithGoogle } from "../utils/firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const UserAuthContext = createContext<User | null>(null);

interface ContextProps {
  children: React.ReactNode;
}

export const UserAuthContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserAuthContext.Provider value={user}>{children}</UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
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
