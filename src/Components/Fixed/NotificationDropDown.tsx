import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, addNotification } from "../Redux/notificationSlice";
import { RootState } from "../Redux/store";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CloseIcon from "@mui/icons-material/Close";

import TryIcon from "@mui/icons-material/Try";

import TextsmsIcon from "@mui/icons-material/Textsms";

import CheckIcon from "@mui/icons-material/Check";

type ProfileData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  profilePic: string;
  role: string;
};

type notificationData = {
  firstName: string;
  lastName: string;
  profilePic: string;
};

const NotificationDropDown = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications);

  let token = Cookies.get("auth");

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:8008/requests`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });

      dispatch(setNotifications(response.data));
      console.log("profiledata log: " + JSON.stringify(response.data));
      if (showNotifications) {
        response.data.forEach((profile: any) => {
          if (!toast.isActive(profile.id)) {
            toast(
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //   width: "500px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // marginRight: "20px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif", // Change this to your preferred font
                      color: "green", // Change this to your preferred color
                      textAlign: "left", // This will center the text horizontally
                      fontSize: "13px",
                    }}
                  >
                    FRIEND REQUEST:{" "}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      src={profile.profilePic}
                      alt="Profile"
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "grey",
                      textAlign: "center",
                      fontSize: "12px",
                    }}
                  >
                    {profile.firstName} {profile.lastName}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    aria-label="settings"
                    sx={{
                      color: "light-blue",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                    onClick={() => {}}
                  >
                    <CheckIcon
                      sx={{
                        fontSize: "35px",
                        "&:hover": {
                          fontSize: "40px",
                        },
                      }}
                    />
                  </IconButton>
                </div>
                <IconButton
                  aria-label="settings"
                  sx={{
                    color: "grey",
                    "&:hover": {
                      color: "green",
                    },
                  }}
                  onClick={() => {}}
                >
                  <TextsmsIcon
                    sx={{
                      fontSize: "25px",
                      "&:hover": {
                        fontSize: "30px",
                      },
                    }}
                  />
                </IconButton>
                <IconButton
                  aria-label="settings"
                  sx={{
                    color: "red",

                    "&:hover": {
                      color: "red",
                    },
                  }}
                  onClick={() => {}}
                >
                  <CloseIcon
                    sx={{
                      fontSize: "20px",
                      "&:hover": {
                        fontSize: "25px",
                      },
                    }}
                  />
                </IconButton>
              </div>,
              { toastId: profile.id }
            );
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [token, dispatch, showNotifications]);

  const handleButtonClick = async () => {
    const newShowNotifications = !showNotifications;
    setShowNotifications(newShowNotifications);
    if (!newShowNotifications) {
      await fetchProfile();
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetches data when the component mounts
  }, [fetchProfile, showNotifications]);

  return (
    <div>
      <IconButton onClick={handleButtonClick}>
        <NotificationsIcon />
      </IconButton>

      <ToastContainer
        style={{ top: "6rem" }}
        stacked
        position="top-right"
        theme="colored"
        // hideProgressBar={false}
      />
    </div>
  );
};

export default NotificationDropDown;
