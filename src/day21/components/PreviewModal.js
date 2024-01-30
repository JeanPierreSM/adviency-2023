import React, { useState, useEffect, useRef } from "react";
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
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Box textAlign="center" color="#2D3748" fontWeight="bold">
        LISTA DE PRODUCTOS
      </Box>
      <Box
        as="ul"
        maxH="370px"
        overflowY="auto"
        my={8}
        className="scroll-container"
      >
        <style>
          {`
          @media print {
            .scroll-container {
              overflow: visible !important;
              height: fit-content !important;
            }
          }
        `}
        </style>
        {(props.gifts || []).map((gift, index) => (
          <>
            <GiftRow gift={gift} index={index} hidePriceAndActionButtons />
            {index < props.gifts.length - 1 && (
              <Box bg="white">
                <Divider orientation="horizontal" />
              </Box>
            )}
          </>
        ))}
      </Box>
    </div>
  );
});

const PreviewModal = ({ isOpen, onClose, gifts }) => {
  const inputRef = useRef();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputRef}
      h="720px"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
      <ModalContent bg="red.50" h="620px">
        <ModalHeader>Previsualización de Compra</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ComponentToPrint ref={printRef} gifts={gifts} />
        </ModalBody>
        <ModalFooter>
          <Button bg="#EA4630" mr={3} onClick={handlePrint} ref={inputRef}>
            Imprimir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PreviewModal;
