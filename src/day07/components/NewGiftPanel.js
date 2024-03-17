import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

const NewGiftPanel = ({ onSave, gifts }) => {
  const [giftName, setGiftName] = useState("");
  const [giftNameIsRepeated, setGiftNameIsRepeated] = useState(false);

  const handleSave = () => {
    const isRepeatedGift = (gifts || []).some(
      (gift) => gift.name.toLowerCase() === giftName.toLowerCase(),
    );
    setGiftNameIsRepeated(isRepeatedGift);

    if (giftName === "" || isRepeatedGift) return;
    setGiftName("");
    onSave(giftName);
  };

  return (
    <Box display="flex" flexDirection="row">
      <FormControl isInvalid={giftNameIsRepeated}>
        <Input
          value={giftName}
          focusBorderColor="#378b29"
          errorBorderColor="red.500"
          onChange={(e) => setGiftName(e.target.value)}
          placeholder="Una PS5 estaría muy bien..."
        />
        <FormErrorMessage>Este regalo ya fue ingresado</FormErrorMessage>
      </FormControl>
      <Button colorScheme="red" ml={1} onClick={() => handleSave()}>
        Agregar
      </Button>
    </Box>
  );
};

export default NewGiftPanel;
