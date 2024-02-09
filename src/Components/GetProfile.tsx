import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Profile from "../Pages/ProfilePage";
import Loading from "./Animations/Loading";
import ProfilePage from "../Pages/ProfilePage";

interface ProfileData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  role: string;
}

export default function GetProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const token = Cookies.get("auth");

  const fetchProfile = useCallback(async () => {
    try {
      // console.log(token?.trim());
      console.log("fetchProfile is being called");
      const response = await axios({
        method: "post",
        url: "http://localhost:8008/profile",
        // data: user,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });

      setProfileData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    console.log("useEffect is running");
    fetchProfile();
  }, [fetchProfile]);

  return (
    <>
      <div className="Pagefiller">
        {profileData ? (
          <ProfilePage userProfile={profileData}></ProfilePage>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
