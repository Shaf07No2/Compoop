import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { orange } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PublishIcon from "@mui/icons-material/Publish";

import axios from "axios";
import Cookies from "js-cookie";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { ProfilePicContext } from "../Fixed/ProfilePicProvider";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export interface PostCreation2 {
  title: string;
  description: string;
  picture: string;
  user: {
    id: number;
  };
}

const notify = () => {
  toast.success("🚀 Post Submitted!", {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const CreatePost: React.FC = () => {
  const token = Cookies.get("auth");
  const userId = localStorage.getItem("userId");
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const profilePic = React.useContext(ProfilePicContext);

  const history = useHistory();

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
    } catch (error) {
      console.error(error);
    }
  }, [postData, token]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset the form after submission
    setPostData({
      title: "",
      description: "",
      picture: "",
      user: { id: Number(userId) },
    });

    try {
      submitPost();

      notify();
      history.push("/feed");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Stack
          spacing={3}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Card
            sx={{
              minWidth: 375,
              maxWidth: 375,
              marginTop: 2,
              marginBottom: 2,
              position: "relative",
              borderRadius: "2%",
              bgcolor: "rgba(0,0,0,0.50)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt="user"
                  src={profilePic.profilePic}
                  sx={{ bgcolor: orange[500], width: "60px", height: "60px" }}
                />
              }
            />

            <form onSubmit={handleSubmit}>
              <CardContent sx={{}}>
                <Typography
                  variant="h6"
                  component="div"
                  // sx={{ color: "blueviolet" }}
                  sx={{
                    color: "rgba(212,227,231,1)",
                  }}
                >
                  Title:
                </Typography>
                <Typography>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                    // style={{ width: "150%" }}
                  />
                </Typography>
              </CardContent>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  // sx={{ color: "blueviolet" }}
                  sx={{
                    color: "rgba(212,227,231,1)",
                  }}
                >
                  Image source-link:
                </Typography>
                <Typography>
                  <input
                    type="text"
                    id="picture"
                    name="picture"
                    value={postData.picture}
                    onChange={handleChange}
                    style={{}}
                  />
                </Typography>
              </CardContent>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  // sx={{ color: "blueviolet" }}
                  sx={{
                    color: "rgba(212,227,231,1)",
                  }}
                >
                  Description:
                </Typography>
                <Typography paragraph>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={postData.description}
                    onChange={handleChange}
                  />
                </Typography>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 320, // Add this line
                    left: 300,
                    bgcolor: "rgba(240,240,240,0.5)",
                    width: "90px",
                    height: "90px",

                    "&:hover": {
                      bgcolor: "rgba(240,240,240,1)",
                      top: 310, // Add this line
                      left: 290,
                      width: "100px",
                      height: "100px",
                    },
                  }}
                  type="submit"
                >
                  <PublishIcon />
                </IconButton>
              </CardContent>
              {/* <button type="submit">Submit Post</button> */}
            </form>
          </Card>
        </Stack>
      </Slide>
    </>
  );
};

export default CreatePost;
