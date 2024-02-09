import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import UserPost from "../Posting/GetPost";

function PoopCardContainer() {
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
export default PoopCardContainer;
