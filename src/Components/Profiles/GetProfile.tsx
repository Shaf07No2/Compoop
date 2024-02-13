import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
// import Profile from "../Pages/ProfilePage";
// import Loading from "./Animations/Loading";
// import ProfilePage from "../Pages/ProfilePage";
import ProfilePage from "../../Pages/ProfilePage";
import Loading from "../Animations/Loading";
import axios from "axios";
import { decodeJwt as JWT } from "jose";
import { useParams } from "react-router-dom";

interface ProfileData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  profilePic: string;
  role: string;
}

export default function GetProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  let token = Cookies.get("auth");
  // let paramId = useParams();

  // if (token) {
  //   let claims = JWT(token);
  //   console.log(token);
  //   claims && "userId" in claims ? (userId = claims.userId) : (userId = "3");
  //   console.log(userId);
  // }

  interface params {
    userId: string;
  }

  let paramId: params = useParams();

  console.log("params= " + paramId.userId);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8008/profile/${paramId.userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });

      setProfileData(response.data);
      console.log("profiledata log: " + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  }, [token, paramId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, token]);

  return (
    <>
      <div className="Pagefiller">
        {profileData ? (
          <ProfilePage profileData={profileData}></ProfilePage>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
