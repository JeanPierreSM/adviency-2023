import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

const ConfirmDeleteAlert = ({
  onCloseDeleteConfirmation,
  onDeleteConfirmation,
  isBulkDelete = false,
}) => {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      isOpen
      onClose={onCloseDeleteConfirmation}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {`Eliminar ${isBulkDelete ? "regalos" : "regalo"}`}
          </AlertDialogHeader>
          <AlertDialogBody>
            {`¿Estás seguro de que deseas eliminar ${
              isBulkDelete ? "todos los regalos" : "este regalo"
            }?`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseDeleteConfirmation}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onDeleteConfirmation} ml={3}>
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDeleteAlert;
