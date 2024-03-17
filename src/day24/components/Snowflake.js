import React from "react";
import { Box } from "@chakra-ui/react";

const Snowflake = ({ position }) => {
  return (
    <Box
      as="span"
      role="img"
      aria-label="snowflake"
      position="absolute"
      fontSize="24px"
      top={position.top}
      left={position.left}
    >
      ❄️
    </Box>
  );
};

export default Snowflake;
