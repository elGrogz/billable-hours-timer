import { createContext, useState } from "react";
import { signInWithGoogle } from "../utils/firebase";

const UserAuthContext = createContext(undefined);

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
