import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const NewGiftPanel = ({ onSave }) => {
  const [giftName, setGiftName] = useState("");
  const [giftQuantity, setGiftQuantity] = useState(1);

  const handleSave = () => {
    if (giftName === "") return;
    setGiftName("");
    setGiftQuantity(1);
    onSave(giftName, giftQuantity);
  };

  return (
    <Box display="flex" flexDirection="row">
      <Input
        value={giftName}
        focusBorderColor="#378b29"
        onChange={(e) => setGiftName(e.target.value)}
        placeholder="¿Una PS5 quizás?"
        mr={2}
      />
      <NumberInput
        value={giftQuantity}
        onChange={(e) => setGiftQuantity(e)}
        size="md"
        maxW={20}
        mr={2}
        focusBorderColor="#378b29"
        defaultValue={giftQuantity}
        min={1}
        allowMouseWheel
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button colorScheme="red" ml={1} onClick={() => handleSave()}>
        Agregar
      </Button>
    </Box>
  );
};

export default NewGiftPanel;
