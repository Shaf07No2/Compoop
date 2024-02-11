import axios from "axios";
import Cookies from "js-cookie";
import * as React from "react";
import PoopCard from "../Cards/PoopCard";
import { pathPropType } from "../Containers/PoopCardContainer";

export interface UserPostInterface {
  id: number;
  title: string;
  description: string;
  picture: string;
  userId: string;
  date: string;
  profilePic: string;
}

export interface ParsedUserPost {
  id: number;
  title: string;
  description: string;
  picture: string;
  userId: string;
  date: string;
  profilePic: string;
}

export default function GetPost({ postPath }: pathPropType) {
  const [profileData, setProfileData] = React.useState<UserPostInterface[]>([]);
  const token = Cookies.get("auth");
  const userId = localStorage.getItem("userId");
  const url = `http://localhost:8008/${postPath}/${userId}`;

  // console.log(postPath as string);
  const fetchProfile = React.useCallback(async () => {
    try {
      // console.log("fetchProfile is being called");
      // console.log(`http://localhost:8008/${postPath}/${userId}`);
      const response = await axios({
        method: "get",
        url: `http://localhost:8008/${postPath}/${userId}`,

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });

      setProfileData(
        response.data.map((post: any) => ({
          id: post.id,
          title: post.title,
          description: post.description,
          picture: post.picture,
          user: post.user,
          date: post.date,
          profilePic: post.profilePic,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }, [token, userId, postPath]);

  React.useEffect(() => {
    // console.log("useEffect is running");
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div>
      {profileData.map((post, index) => (
        <PoopCard key={index} post={post} />
      ))}
    </div>
  );
}