import React, { useState } from "react";
import { Box, FormLabel, Input, Button } from "@chakra-ui/react";

const NewGiftPanel = ({ handleSave }) => {
  const [giftName, setGiftName] = useState("");

  return (
    <Box display="flex" flexDirection="row">
      <Input
        value={giftName}
        focusBorderColor="#378b29"
        onChange={(e) => setGiftName(e.target.value)}
        placeholder="Una PS5 estaría muy bien..."
      />
      <Button
        colorScheme="red"
        ml={1}
        onClick={() => {
          if (giftName !== "") {
            setGiftName("");
            handleSave(giftName);
          }
        }}
      >
        Agregar
      </Button>
    </Box>
  );
};

export default NewGiftPanel;
