import React, { useState } from "react";
import axios from "axios";

const MyForm = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);

    try {
      const response = await axios({
        method: "post",
        url: "/api/endpoint",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default MyForm;
