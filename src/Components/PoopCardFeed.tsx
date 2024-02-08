import PoopCard from "./PoopCard";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import { imageSources } from "../cardPhotoSources";
import UserPost from "./UserPost";

function PoopCardFeed() {
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Stack
        spacing={3}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <UserPost></UserPost>
      </Stack>
    </Slide>
  );
}
export default PoopCardFeed;
