import React from "react";
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
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const MY_LINKEDIN = "https://www.linkedin.com/in/jeanpierresaintmartin/";

const AboutDayRequirementModal = ({
  isOpen,
  activeDayRequirement,
  onClose,
}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} h="600px">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
      <ModalContent bg="red.50" h="500px">
        <ModalHeader>
          Requerimientos del Día #{activeDayRequirement.dayNumber}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="l" textAlign="justify">
            {activeDayRequirement.info}
          </Text>
          <Box pb={78} />
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
            {`v0.${activeDayRequirement.dayNumber}`}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} bg="#FF0000">
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AboutDayRequirementModal;
