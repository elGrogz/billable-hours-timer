import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";
import { signOutFromGoogle } from "../utils/firebase";

const UserHeader = () => {
  const [userImage, setUserImage] = useState<string | null | undefined>("");
  const [signoutButtonHoverState, setSignoutButtonHoverState] =
    useState<boolean>(false);

  const user = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUserImage(user?.photoURL);
  }, []);

  const handleSignoutMouseEnter = () => {
    setSignoutButtonHoverState(true);
  };

  const handleSignoutMouseLeave = () => {
    setSignoutButtonHoverState(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {userImage && (
        <img
          style={{
            height: 25,
            width: 25,
            borderRadius: "40%",
            marginInline: 5,
          }}
          src={userImage}
        />
      )}
      <h4>{user?.email}</h4>
      <div>
        {user ? (
          <div
            style={{
              borderRadius: 5,
              marginInline: 5,
              backgroundColor: signoutButtonHoverState ? "tomato" : "white",
              textAlign: "center",
              alignItems: "center",
              padding: 10,
              border: "medium solid black",
              boxShadow: "4px 4px 2px 1px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={handleSignoutMouseEnter}
            onMouseLeave={handleSignoutMouseLeave}
            onClick={() => {
              signOutFromGoogle();
              navigate("/");
            }}
          >
            Sign out!
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserHeader;
