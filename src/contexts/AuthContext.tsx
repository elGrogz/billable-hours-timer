import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebase";

// an interface describes data shapes (an object)
interface ContextProps {
  children: React.ReactNode;
}

// type aliases is a type of data, eg a prmitive/tuple
type AppUser = User | null;

// creates the context that will be used by other components with a null default value
const userAuthContext = createContext<User | null>(null);

export const UserAuthContextProvider: React.FC<ContextProps> = ({
  // gets the children components so it can render them
  children,
}) => {
  // saves the state of the user, which is either a firebase user or null
  const [user, setUser] = useState<AppUser>(null);

  //run this on mount (when the auth context is used, which is at the start of the app)
  useEffect(() => {
    // create function that can subscribes to the firebase auth object (the 'getAuth()' function)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // callback with the current `User` value
      console.log("auth state changed: ", currentUser);
      // sets the user state to this user. Can be User or Null
      setUser(currentUser);
    });

    // cleanup component's observer when it unmounts
    return () => unsubscribe();
  }, []);

  return (
    // the context component (what the component actually is
    // it makes the value available to all inheriting chldren commponents, which in this case is the firebase User if it exists
    <userAuthContext.Provider value={user}>{children}</userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  // used by children components and returns the current value of the nearest provider.
  return useContext(userAuthContext);
};
