import React, { useState, useRef } from "react";
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
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

const randomGifts = [
  "Mate de cerámica",
  "Termo para mate",
  "Kit de asado",
  "Nintendo Switch",
  "Repelente de mosquitos",
  "Caja de yerba mate premium",
  "Set de cocina de acero inoxidable",
  "Caja de vinos",
  "Bolso térmico para picnic",
  "Cargador portátil",
  "Agenda 2024",
  "Caja de herramientas",
  "Kit de cuidado personal",
  "Paraguas resistente al viento",
  "Lámpara LED",
  "Set de organizadores para el hogar",
  "Kit de plantas de interior",
  "Auriculares para PC",
  "Mochila resistente al agua",
  "Saga de libros",
];

const NewGiftModal = ({ isOpen, onSave, onClose, giftToBeEdited }) => {
  const inputRef = useRef();

  const [giftData, setGiftData] = useState(
    giftToBeEdited || {
      name: "",
      link: "",
      quantity: 1,
      recipient: "",
    },
  );

  const handleInputChange = (key, value) => {
    setGiftData({
      ...giftData,
      [key]: value,
    });
  };

  const handleSave = () => {
    if (giftData.name === "" || giftData.link === "") return;
    onSave(giftData, !!giftToBeEdited);
  };

  const handleSelectRandomGift = () => {
    const randomIndex = Math.floor(Math.random() * randomGifts.length);
    const randomGift = randomGifts[randomIndex];
    handleInputChange("name", randomGift);
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputRef}
      h="520px"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
      <ModalContent bg="red.50" h="420px">
        <ModalHeader>Agregar nuevo regalo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex py={2}>
            <Box flex="75%">
              <FormLabel>Descripción</FormLabel>
              <Box display="flex" flexDirection="row">
                <Input
                  value={giftData.name}
                  ref={inputRef}
                  focusBorderColor="#378b29"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="¿Una PS5 quizás?"
                  mr={2}
                />
                <Tooltip label="Sorprendeme!" hasArrow bg="#FF0000">
                  <IconButton
                    onClick={() => handleSelectRandomGift()}
                    icon={<RepeatIcon />}
                    bg="#FF0000"
                    isRound="true"
                    size="sm"
                    ml={2}
                    mt={1}
                  />
                </Tooltip>
              </Box>
            </Box>
            <Box flex="25%" ml={16}>
              <FormLabel>Cantidad</FormLabel>
              <NumberInput
                value={giftData.quantity}
                onChange={(e) => handleInputChange("quantity", e)}
                size="md"
                maxW={20}
                focusBorderColor="#378b29"
                defaultValue={giftData.quantity}
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
              value={giftData.link}
              focusBorderColor="#378b29"
              onChange={(e) => handleInputChange("link", e.target.value)}
              placeholder="https://image.com"
            />
          </Box>
          <Box py={2}>
            <FormLabel>Destinatario</FormLabel>
            <Input
              value={giftData.recipient}
              focusBorderColor="#378b29"
              onChange={(e) => handleInputChange("recipient", e.target.value)}
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
