import axios from "axios";
import Cookies from "js-cookie";
import * as React from "react";
import PoopCard from "../Cards/PoopCard";

export interface UserPostInterface {
  id: number;
  title: string;
  description: string;
  picture: string;
  userId: string;
  date: string;
}

export interface ParsedUserPost {
  id: number;
  title: string;
  description: string;
  picture: string;
  userId: string;
  date: string;
}

export default function UserPost() {
  const [profileData, setProfileData] = React.useState<UserPostInterface[]>([]);
  const token = Cookies.get("auth");
  const userId = localStorage.getItem("userId");
  // const url = `http://localhost:8008/${postPath}/${userId}`

  // console.log(postPath as string);
  const fetchProfile = React.useCallback(async () => {
    try {
      console.log("fetchProfile is being called");
      const response = await axios({
        method: "get",
        url: `http://localhost:8008/home/${userId}`,

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
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }, [token, userId]);

  React.useEffect(() => {
    console.log("useEffect is running");
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
