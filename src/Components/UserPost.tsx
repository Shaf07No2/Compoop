import axios from "axios";
import Cookies from "js-cookie";
import * as React from "react";
import PoopCard from "./PoopCard";
// import jwt_decode from "jwt-decode";
// const jwtDecode = require("jwt-decode");
// import * as jwt_decode from 'jwt-decode';

export interface UserPostInterface {
  id: number;
  title: string;
  description: string;
  picture: string;
  userId: string;
  date: string;
}

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   userName: string;
//   role: string;
// }

export interface ParsedUserPost {
  id: number;
  title: string;
  description: string;
  picture: string;
  userId: string;
  date: string;
}

// export interface UserPostInterface {
//   UserPost: string;
// }

export default function UserPost() {
  const [profileData, setProfileData] = React.useState<UserPostInterface[]>([]);
  const token = Cookies.get("auth");
  const userId = 1;
  // const userId = Number(Cookies.get("userId"));
  // const decodedToken = jwt_decode.default(token);

  // const userId = decodedToken.userId;

  const fetchProfile = React.useCallback(async () => {
    try {
      console.log("fetchProfile is being called");
      const response = await axios({
        method: "get",
        url: `http://localhost:8008/user/${userId}`,

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
    // console.log(profileData!.title);
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div>
      {/* {JSON.stringify(profileData)} */}
      {/* {[JSON.stringify(profileData)]} */}
      {/* {profileData!.title} */}
      {profileData.map((post, index) => (
        <PoopCard key={index} post={post} />
      ))}

      {/* {<PoopCard UserPost={JSON.stringify(profileData)} />} */}
      {/* {profileData && <PoopCard UserPost={JSON.stringify(profileData)} />} */}
    </div>
  );
}
