import PoopCard from "./PoopCard";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";

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
        <PoopCard />
        <PoopCard />
        <PoopCard />
      </Stack>
    </Slide>
  );
}
export default PoopCardFeed;
