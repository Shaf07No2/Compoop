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

import PoopCardContainer from "../Components/Containers/PoopCardContainer";

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

export default function ProfilePage({
  profileData,
}: {
  profileData: ProfileData;
}) {
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
                      <PoopCardContainer postPath={"user"}></PoopCardContainer>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Slide>
    </div>
  );
}
