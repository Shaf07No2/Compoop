import { Link } from "react-router-dom";
import PoopCardContainer from "../Components/Containers/PoopCardContainer";
import PoopCardFeed from "../Components/Containers/PoopCardContainer";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Poopfeed() {
  const token = Cookies.get("auth");
  // let claim;

  // token ? (claim = jwtDecode(token)) : console.log("no token");

  let userId;

  if (token) {
    let claims = jwtDecode(token);
    console.log(token);
    claims && "userId" in claims
      ? (userId = claims.userId)
      : console.log("no user Id");
  }

  return (
    <>
      <Link
        to={`/profile/${userId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h1> temp link to profile </h1>
      </Link>

      <div>
        <PoopCardContainer postPath="home" />
      </div>
    </>
  );
}
export default Poopfeed;
