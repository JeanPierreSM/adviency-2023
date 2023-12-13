import React, { useState } from "react";
import { Box, Input, Flex, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const NewGiftModal = ({ isOpen, onSave, onClose }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState("");

  const handleSave = () => {
    if (name === "" || link === "") return;
    onSave({ name, link, quantity, recipient });
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} h="520px">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
      <ModalContent bg="red.50" h="420px">
        <ModalHeader>Agregar nuevo regalo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex py={2}>
            <Box flex="75%">
              <FormLabel>Descripción</FormLabel>
              <Input
                value={name}
                focusBorderColor="#378b29"
                onChange={(e) => setName(e.target.value)}
                placeholder="¿Una PS5 quizás?"
                mr={2}
              />
            </Box>
            <Box flex="25%" ml={16}>
              <FormLabel>Cantidad</FormLabel>
              <NumberInput
                value={quantity}
                onChange={(e) => setQuantity(e)}
                size="md"
                maxW={20}
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
            </Box>
          </Flex>
          <Box py={2}>
            <FormLabel>Link de imagen</FormLabel>
            <Input
              value={link}
              focusBorderColor="#378b29"
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://image.com"
            />
          </Box>
          <Box py={2}>
            <FormLabel>Destinatario</FormLabel>
            <Input
              value={recipient}
              focusBorderColor="#378b29"
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Juancito"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button bg="#EA4630" mr={3} onClick={handleSave}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewGiftModal;
