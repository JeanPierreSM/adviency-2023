import React, { useRef } from "react";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Divider,
} from "@chakra-ui/react";
import GiftRow from "./GiftRow";

const PreviewModal = ({ isOpen, onClose, gifts }) => {
  const inputRef = useRef();

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
        <ModalHeader>Previsualización de Compra</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="ul" maxH="300px" overflowY="auto" my={8}>
            {(gifts || []).map((gift, index) => (
              <>
                <GiftRow gift={gift} index={index} hidePriceAndActionButtons />
                {index < gifts.length - 1 && (
                  <Box bg="white">
                    <Divider orientation="horizontal" />
                  </Box>
                )}
              </>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button bg="#EA4630" mr={3} onClick={onClose} ref={inputRef}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PreviewModal;
