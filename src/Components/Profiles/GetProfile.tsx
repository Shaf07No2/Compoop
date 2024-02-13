import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
// import Profile from "../Pages/ProfilePage";
// import Loading from "./Animations/Loading";
// import ProfilePage from "../Pages/ProfilePage";
import ProfilePage from "../../Pages/ProfilePage";
import Loading from "../Animations/Loading";
import axios from "axios";

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
  const token = Cookies.get("auth");

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8008/profile",

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });

      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);
  console.log("profiledata log: " + profileData);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <>
      {/* <div className="Pagefiller">
        {profileData ? (
          <ProfilePage userProfile={profileData}></ProfilePage>
        ) : (
          <Loading />
        )}
      </div> */}
    </>
  );
}
