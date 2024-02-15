import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import UserPost from "../Posting/GetPost";
import GetPost from "../Posting/GetPost";
import Friends from "../Social/Friends";

export interface pathPropType {
  postPath: string;
}

function FriendsContainer() {
  return (
    <div>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Stack
          spacing={3}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          marginTop="50px"
          alignItems="center"
          sx={{ flexDirection: "row" }}
        >
          <Friends />
        </Stack>
      </Slide>
    </div>
  );
}
export default FriendsContainer;
