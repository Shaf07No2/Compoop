import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(Box)({
  position: "fixed",
  width: "100%",
  height: "200%",
  backgroundImage: `url(${
    process.env.PUBLIC_URL + "/images/leafy-background.jpeg"
  })`,
  backgroundSize: "cover",
  backgroundRepeat: "repeat-y",
  zIndex: -1,
});

const Background = () => {
  const [blur, setBlur] = useState(33);

  useEffect(() => {
    const handleScroll = () => {
      const blurValue = Math.max(Math.min(0.1 * window.pageYOffset, 20), 5);
      setBlur(blurValue);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const BlurredBox = styled(StyledBox)({
    filter: `blur(${blur}px)`,
  });

  return <BlurredBox />;
};

export default Background;
