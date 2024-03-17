import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ChevronLeft, ChevronRight } from "react-feather";
import requirementsData from "../../requirements.json";

const MY_LINKEDIN = "https://www.linkedin.com/in/jeanpierresaintmartin/";

const AboutDayRequirementModal = ({ isOpen, onClose }) => {
  const inputRef = useRef();
  const [dayNumber, setDayNumber] = useState(1);
  const activeDayRequirement = requirementsData.requirementsByDay.find(
    (item) => item.dayNumber === dayNumber,
  );

  const decrementDay = () => {
    setDayNumber((prevDayNumber) => prevDayNumber - 1);
  };

  const incrementDay = () => {
    setDayNumber((prevDayNumber) => prevDayNumber + 1);
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputRef}
      h="600px"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
      <ModalContent bg="red.50" h="500px">
        <ModalHeader>Requerimientos por Día</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ display: "flex", flexDirection: "column" }}>
          <Flex justify="space-between" align="center" mt={4}>
            <IconButton
              icon={<ChevronLeft style={{ color: "black" }} size={17} />}
              onClick={() => {
                if (dayNumber > 1) decrementDay();
              }}
              ml={1}
            />
            <Text fontSize="xl">Día {dayNumber}</Text>
            <IconButton
              icon={<ChevronRight style={{ color: "black" }} size={17} />}
              onClick={() => {
                if (dayNumber < 23) incrementDay();
              }}
              ml={1}
            />
          </Flex>
          <Text fontSize="l" textAlign="justify" mt={6}>
            {activeDayRequirement.info}
          </Text>
          <Box flex="1" />
          <Text pb={1} fontSize="l" textAlign="center">
            Desarrollado por Jean Pierre Saint Martin
          </Text>
          <Text fontSize="l" textAlign="center">
            Mi LinkedIn
            <ExternalLinkIcon
              mx="2px"
              color="red.500"
              onClick={() => window.open(MY_LINKEDIN, "_blank")}
              _hover={{
                cursor: "pointer",
              }}
            />
          </Text>
          <Text fontSize="l" textAlign="center">
            {`v0.24`}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} ref={inputRef} bg="#FF0000">
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AboutDayRequirementModal;
