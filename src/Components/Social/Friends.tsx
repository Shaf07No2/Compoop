import { useState } from "react";
import PoopCardFeed from "../Containers/PoopCardContainer";
import NotificationDropDown from "../Fixed/NotificationDropDown";
import SearchComponent from "../Fixed/SearchComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { CenterFocusStrong } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { MDBCardText } from "mdb-react-ui-kit";

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

export default function Friends() {
  const [results, setResults] = React.useState<SearchResultFormat[]>([]);

  const history = useHistory();

  const handleClick = (id: string) => {
    console.log("Profile clicked");
    history.push(`/profile/${id}`);
  };

  const token = Cookies.get("auth");
  let userId: any;
  if (token) {
    let claims = jwtDecode(token);
    claims && "userId" in claims ? (userId = claims.userId) : (userId = "3");
  }

  React.useEffect(() => {
    console.log("sending request");
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

        console.log(response.data);
      })

      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [userId, token]);

  return (
    <>
      {results.map((result: SearchResultFormat) => (
        <div
          // to={`/profile/${result.id}`}
          // to={`/compoop`}
          key={result.id}
          style={{ textDecoration: "none", color: "inherit" }}
          // onClick={(event: any) => {
          //   event.preventDefault();
          //   event.stopPropagation();
          // }}
          onClick={() => handleClick(`${result.id}`)}
        >
          <Card
            sx={{
              minWidth: 150,
              maxWidth: 200,
              minLength: 240,
              marginTop: 1,
              borderRadius: "20%",
              bgcolor: "rgba(0,0,0,0.50)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.58)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
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
