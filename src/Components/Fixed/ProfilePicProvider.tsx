import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

export const ProfilePicContext = createContext({
  profilePic: "",
  clearProfilePic: () => {},
});

export default function ProfilePicProvider({ children, setAuth }: any) {
  // Rename the function to reflect its purpose
  const [profilePic, setProfilePic] = useState("");
  const token = Cookies.get("auth");
  const userId = localStorage.getItem("userId");

  const fetchProfile = React.useCallback(async () => {
    try {
      // const response = await axios({
      //   method: "get",
      //   url: `http://localhost:8008/user/${userId}`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: token,
      //   },
      //   withCredentials: true,
      // });
      const response = await axios({
        method: "post",
        url: "http://localhost:8008/profile",

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      // console.log(JSON.stringify(response));
      // console.log(JSON.stringify(response.data));
      // console.log(response.data[0].profilePic);
      console.log(response.data.profilePic);
      setProfilePic(response.data.profilePic);
    } catch (error) {
      console.error(error);
    }
  }, [token, userId]);

  React.useEffect(() => {
    if (!userId || !token) {
      setProfilePic("");
      return;
    }
    console.log("profilepic useEffect is running");
    fetchProfile();
  }, [fetchProfile, token, userId]);

  const clearProfilePic = () => setProfilePic("");

  return (
    <ProfilePicContext.Provider
      value={{
        profilePic,
        clearProfilePic,
      }}
    >
      {children}
    </ProfilePicContext.Provider>
  );
}