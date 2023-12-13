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
import PropTypes from "prop-types";

const NewGiftModal = ({ isOpen, onSave, onClose }) => {
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
    <Modal isCentered isOpen={isOpen} onClose={onClose} h="470px">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
      <ModalContent bg="red.50" h="370px">
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
              mr={2}
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

NewGiftModal.defaultProps = {
  edit: null,
};

NewGiftModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.object,
};

export default NewGiftModal;
