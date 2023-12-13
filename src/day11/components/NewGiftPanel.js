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
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSave = () => {
    if (name === "" || link === "") return;
    setName("");
    setLink("");
    setQuantity(1);
    onSave({ name, link, quantity });
  };

  return (
    <Box display="flex" flexDirection="row">
      <Input
        value={name}
        focusBorderColor="#378b29"
        onChange={(e) => setName(e.target.value)}
        placeholder="¿Una PS5 quizás?"
        mr={2}
      />
      <Input
        value={link}
        focusBorderColor="#378b29"
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://image.com"
        mr={2}
      />
      <NumberInput
        value={quantity}
        onChange={(e) => setQuantity(e)}
        size="md"
        maxW={20}
        mr={2}
        focusBorderColor="#378b29"
        defaultValue={quantity}
        min={1}
        allowMouseWheel
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button colorScheme="red" w="230px" ml={1} onClick={() => handleSave()}>
        Agregar
      </Button>
    </Box>
  );
};

export default NewGiftPanel;
