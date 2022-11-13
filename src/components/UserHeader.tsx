import { useEffect, useState } from "react";
import { useUserAuth } from "../contexts/AuthContext";

const UserHeader = () => {
  const [userImage, setUserImage] = useState<string | null | undefined>("");

  const user = useUserAuth();

  useEffect(() => {
    setUserImage(user?.photoURL);
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "right", alignItems: "center" }}
    >
      <h5>{user?.email}</h5>
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
    </div>
  );
};

export default UserHeader;
