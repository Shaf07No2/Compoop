import { Link } from "react-router-dom";
import PoopCardContainer from "../Components/Containers/PoopCardContainer";
import PoopCardFeed from "../Components/Containers/PoopCardContainer";
import Popup from "reactjs-popup";

function Poopfeed() {
  return (
    <>
      <Link
        // to={`/users/${result.userId}`}
        // key={index}
        // to={`/poopfeed`}
        to={`/poopfeed`}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => {
          alert("Link clicked!"); // This will show an alert when the link is clicked
          // console.log("Link clicked!");
          // setAnchorEl(null); // Close the popover
        }}
      >
        {" "}
        <h2> link to compoop </h2>
      </Link>

      <div>
        <PoopCardContainer postPath="home" />
      </div>
    </>
  );
}
export default Poopfeed;
