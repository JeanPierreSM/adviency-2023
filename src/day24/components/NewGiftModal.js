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
  InputGroup,
  InputLeftAddon,
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

const NewGiftModal = ({
  isOpen,
  onSave,
  onClose,
  giftToBeEdited,
  giftToBeDuplicated,
}) => {
  const inputRef = useRef();

  const [giftData, setGiftData] = useState(
    giftToBeEdited
      ? giftToBeEdited
      : giftToBeDuplicated
        ? giftToBeDuplicated
        : {
            name: "",
            price: 1000,
            quantity: 1,
            link: "",
            recipient: "",
          },
  );
  const [chosenGifts, setChosenGifts] = useState([]);

  const handleInputChange = (key, value) => {
    setGiftData({
      ...giftData,
      [key]: value,
    });
  };

  const handleSave = () => {
    if (giftData.name === "" || giftData.price === "") return;
    onSave(giftData, !!giftToBeEdited);
  };

  const handleSelectRandomGift = () => {
    let availableGifts = randomGifts.filter(
      (gift) => !chosenGifts.includes(gift),
    );
    if (availableGifts.length === 0) {
      availableGifts = randomGifts;
      setChosenGifts([]);
    }

    const randomIndex = Math.floor(Math.random() * availableGifts.length);
    const randomGift = availableGifts[randomIndex];
    setChosenGifts((prevSelectedGifts) => [...prevSelectedGifts, randomGift]);
    handleInputChange("name", randomGift);
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputRef}
      h="620px"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
      <ModalContent bg="red.50" h="520px">
        <ModalHeader>{`${
          !giftToBeEdited ? "Agregar nuevo" : "Editar"
        } regalo`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex py={2}>
            <Box flex="80%">
              <FormLabel>Descripción</FormLabel>
              <Input
                value={giftData.name}
                ref={inputRef}
                focusBorderColor="#378b29"
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="¿Una PS5 quizás?"
                mr={2}
              />
            </Box>
            <Box flex="20%">
              <Tooltip label="Sorprendeme!" hasArrow bg="#FF0000">
                <IconButton
                  onClick={() => handleSelectRandomGift()}
                  icon={<RepeatIcon />}
                  bg="#FF0000"
                  isRound="true"
                  size="sm"
                  ml={6}
                  mt={8}
                />
              </Tooltip>
            </Box>
          </Flex>
          <Flex py={2}>
            <Box flex="50%">
              <FormLabel>Precio</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" color="gray.600" />
                <NumberInput
                  value={giftData.price}
                  onChange={(e) => handleInputChange("price", e)}
                  size="md"
                  focusBorderColor="#378b29"
                  defaultValue={giftData.price}
                  step={0.1}
                  min={0.1}
                  allowMouseWheel
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </Box>
            <Box flex="50%" ml={16}>
              <FormLabel>Cantidad</FormLabel>
              <NumberInput
                value={giftData.quantity}
                onChange={(e) => handleInputChange("quantity", e)}
                size="md"
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
