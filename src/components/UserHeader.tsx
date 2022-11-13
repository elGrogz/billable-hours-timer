import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";
import { signOutFromGoogle } from "../utils/firebase";

const UserHeader = () => {
  const [userImage, setUserImage] = useState<string | null | undefined>("");

  const user = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUserImage(user?.photoURL);
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "right", alignItems: "center" }}
    >
      <h4>{user?.email}</h4>
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
      <div>
        {user ? (
          <button
            onClick={() => {
              signOutFromGoogle();
              navigate("/");
            }}
          >
            Sign out!
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserHeader;
