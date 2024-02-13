import React, { useCallback, useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import Slide from "@mui/material/Slide";
import UserPost from "../Components/Posting/GetPost";
import PoopCard from "../Components/Cards/PoopCard";
import PoopCardFeed from "../Components/Containers/PoopCardContainer"; // pathPropType,
import PoopCardContainer from "../Components/Containers/PoopCardContainer";
import Cookies from "js-cookie";
import axios from "axios";

interface ProfileData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  profilePic: string;
  role: string;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const token = Cookies.get("auth");

  const postPath = "user";
  const url = "http://localhost:8008/profile";

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios({
        method: "post",
        url: url,

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });

      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);
  console.log("profiledata log: " + profileData);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div
      className="gradient-custom-2"
      style={{ backgroundColor: "transparent" }}
    >
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{
                    background:
                      "linear-gradient(45deg, #FFD700, #FF8C00, #FF4500)",
                    height: "200px",
                    boxShadow: "0 3px 10px 0 rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={profileData?.profilePic}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      // style={{ width: "150px", zIndex: "1" }}
                    />
                    <MDBBtn
                      outline
                      color="dark"
                      style={{ height: "36px", overflow: "visible" }}
                    >
                      Edit profile
                    </MDBBtn>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h5">
                      {profileData?.firstName} {profileData?.lastName}
                    </MDBTypography>
                    <MDBCardText>
                      {profileData?.userName} / {profileData?.email}
                    </MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5">0</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">0</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">0</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <MDBRow>
                    <MDBCol className="mb-2">
                      <PoopCardContainer
                        postPath={postPath}
                      ></PoopCardContainer>
                    </MDBCol>
                  </MDBRow>
                  {/* <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        Web Developer
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        Lives in New York
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-0">
                        Photographer
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4"> */}
                  {/* <MDBCardText className="lead fw-normal mb-0">
                      Recent photos
                    </MDBCardText> */}
                  {/* <MDBCardText className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </MDBCardText> */}
                  {/* </div> */}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Slide>
    </div>
  );
}
