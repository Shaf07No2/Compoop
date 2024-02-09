import axios from "axios";
import Cookies from "js-cookie";
import * as React from "react";

export interface PostCreation2 {
  title: string;
  description: string;
  picture: string;
  user: {
    id: number;
  };
}

// const myPost2: PostCreation2 = {
//   title: "My Amazing Post",
//   description: "This is a great post about something interesting.",
//   picture: "https://example.com/image.jpg",
//   user: {
//     id: 1,
//   },
// };

const CreatePost: React.FC = () => {
  const token = Cookies.get("auth");
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const [postData, setPostData] = React.useState<PostCreation2>({
    title: "",
    description: "",
    picture: "",
    user: { id: Number(userId) },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const submitPost = React.useCallback(async () => {
    try {
      console.log("fetchProfile is being called");
      const response = await axios({
        method: "post",
        url: "http://localhost:8008/create",
        data: postData,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [postData, token]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Submit the form data here (e.g., send to server)
    console.log("Submitting post:", postData);

    // Reset the form after submission
    setPostData({
      title: "",
      description: "",
      picture: "",
      user: { id: Number(userId) },
    });

    try {
      submitPost();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="Pagefiller">
        <form
          onSubmit={handleSubmit}
          style={{ zIndex: 1000, position: "absolute" }}
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={postData.description}
            onChange={handleChange}
          />

          <label htmlFor="picture">Picture URL:</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={postData.picture}
            onChange={handleChange}
          />
          <button type="submit">Submit Post</button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
