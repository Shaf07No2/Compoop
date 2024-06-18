import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
import { MDBCardText } from "mdb-react-ui-kit";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import IconButton from "@mui/material/IconButton";

interface SearchResultFormat {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  profilePic: string;
  role: string;
}

async function deleteFriend(friendId: string) {
  const token = Cookies.get("auth");
  try {
    await axios({
      method: "delete",
      url: `http://localhost:8008/friendremove/${friendId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      withCredentials: true,
    });
    const unfriendButton = document.getElementById("unfriend-" + friendId);
    if (unfriendButton) {
      unfriendButton.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Friends() {
  const [results, setResults] = React.useState<SearchResultFormat[]>([]);

  const history = useHistory();

  const token = Cookies.get("auth");

  const handleClick = (id: string) => {
    console.log("Profile clicked");
    history.push(`/profile/${id}`);
  };

  const handleUnfriendClick = (friendId: string) => {
    deleteFriend(friendId);
    // setResults((prevResults) =>
    //   prevResults.filter((friend) => friend.id.toString() !== friendId)
    // );
  };

  let userId: any;
  if (token) {
    let claims = jwtDecode(token);
    claims && "userId" in claims ? (userId = claims.userId) : (userId = "");
  }

  React.useEffect(() => {
    axios
      .get(`http://localhost:8008/friends/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      })
      .then((response) => {
        setResults(
          response.data.map((item: any) => ({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            password: item.password,
            userName: item.userName,
            profilePic: item.profilePic,
            role: item.role,
          }))
        );
      })

      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [userId, token]);

  return (
    <>
      {results.map((result: SearchResultFormat) => (
        <div
          key={result.id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card
            sx={{
              minWidth: 150,
              maxWidth: 200,
              minLength: 240,
              marginTop: 1,
              position: "relative",
              borderRadius: "15%",
              bgcolor: "rgba(0,0,0,0.50)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.58)",
              },
            }}
          >
            <IconButton
              id={"unfriend-" + result.id.toString()}
              aria-label="settings"
              sx={{
                color: "rgba(87, 116, 230, 0.9)",
                display: "flex",
                position: "absolute",
                top: 0,
                left: 140,
                flexDirection: "column",
                marginLeft: "10px",
                marginTop: "10px",
                "&:hover": {
                  color: "red",
                },
              }}
              onClick={() => {
                handleUnfriendClick(`${result.id.toString()}`);
              }}
            >
              <HowToRegIcon
                sx={{
                  fontSize: "25px",
                  marginBottom: "0px",
                  "&:hover": {
                    fontSize: "30px",
                  },
                }}
              />
            </IconButton>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              onClick={() => handleClick(`${result.id}`)}
            >
              <Avatar
                alt={result.userName}
                src={result.profilePic}
                sx={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "10px",
                  "&:hover": {
                    bgcolor: "rgba(240,240,240,1)",
                    width: "90px",
                    height: "90px",
                  },
                }}
              />
              <Typography
                variant="h6"
                component="div"
                // sx={{ color: "blueviolet" }}
                sx={{
                  color: "rgba(212,227,231,1)",
                }}
              >
                {`${result.firstName} ${result.lastName}`}
              </Typography>
              <MDBCardText className="mb-1 small">
                Friends since: "date here"{" "}
              </MDBCardText>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}
