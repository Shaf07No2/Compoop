import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import GetPost from "../Posting/GetPost";

export interface pathPropType {
  postPath: string;
}

function PoopCardContainer({ postPath }: pathPropType) {
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Stack
        spacing={3}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        sx={{ flexDirection: "row" }}
      >
        <GetPost postPath={postPath}></GetPost>
      </Stack>
    </Slide>
  );
}
export default PoopCardContainer;
