import axios from "axios";
import { useState, useEffect } from "react";

interface ProfileCardProps {
  userName: string;
}

export default function ProfileCard({ userName }: ProfileCardProps) {
  const [profileData, setProfileData] = useState(null);

  const email = "test@example.com";

  const fetchProfile = async () => {
    try {
      const respon = await axios.post(`http://localhost:8008/profile/`);

      const response = await axios({
        method: "post",
        url: "http://localhost:8008/profile",
        data: email,
        headers: { "Content-Type": "application/json" },
      });

      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userName]);

  //   return <div>{JSON.stringify(profileData)}</div>;
  return <div>{profileData && <div>{JSON.stringify(profileData)}</div>}</div>;
}
