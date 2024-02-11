import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { orange } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import axios from "axios";
import Cookies from "js-cookie";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { Form } from "react-hook-form";
import { ProfilePicContext } from "../Fixed/ProfilePicProvider";
import { useHistory } from "react-router-dom";

export interface PostCreation2 {
  title: string;
  description: string;
  picture: string;
  user: {
    id: number;
  };
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
      history.push("/profile");
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
        >
          <Card sx={{ maxWidth: 345, marginTop: 3 }}>
            <CardHeader
              avatar={
                <Avatar
                  alt="user"
                  src={profilePic.profilePic}
                  sx={{ bgcolor: orange[500] }}
                />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />

            <form onSubmit={handleSubmit}>
              <h2> Write your title </h2>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                  />
                }
              />

              {/* <CardMedia
              component="img"
              height="194"
              // src={post.picture}
              alt="Paella dish"
            /> */}
              <CardContent>
                <h3>Image source link</h3>
                <Typography paragraph>
                  <input
                    type="text"
                    id="picture"
                    name="picture"
                    value={postData.picture}
                    onChange={handleChange}
                  />
                </Typography>
              </CardContent>
              <CardContent>
                <h3> Leave a description? </h3>
                <Typography paragraph>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={postData.description}
                    onChange={handleChange}
                  />
                </Typography>
              </CardContent>
              {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions> */}
              {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    <textarea
                      value={postData.description}
                      onChange={handleChange}
                    />
                  </Typography>
                </CardContent>
              </Collapse> */}
              <button type="submit">Submit Post</button>
            </form>
          </Card>
        </Stack>
      </Slide>
    </>
  );
};

export default CreatePost;
