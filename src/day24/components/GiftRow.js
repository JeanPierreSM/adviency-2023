import React, { useState } from "react";
import { Box, Tooltip, IconButton, Image, Spinner } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CopyIcon } from "@chakra-ui/icons";
import ConfirmDeleteAlert from "./ConfirmDeleteAlert";
import DefaultGiftSnapshot from "../../images/default-christmas-gift-snapshot.jpg";
import styled from "styled-components";

const StyledListItem = styled.li`
  padding-top: 1rem; /* Equivalent to py={4} */
  padding-bottom: 1rem; /* Equivalent to py={4} */
  color: #2d3748;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const GiftRow = ({
  gift,
  index,
  handleEditGift,
  deleteGift,
  handleDuplicateGift,
  hidePriceAndActionButtons = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  return (
    <StyledListItem>
      <Box display="flex" flexDirection="row">
        <Box w={12} h={12} mr={6}>
          {isLoading && <Spinner color="red.500" />}
          <Image
            src={gift.link || DefaultGiftSnapshot}
            borderRadius="full"
            alt={`#${index}-image`}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            display={isLoading ? "none" : "block"}
          />
        </Box>
        <Box>
          <Box
            textAlign="left"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {gift.name}&nbsp;
            <Box as="span" color="#4A5568">
              {hidePriceAndActionButtons
                ? `(x${gift.quantity})`
                : `(x${gift.quantity}) - $${(
                    gift.price * gift.quantity
                  ).toFixed(2)}`}
            </Box>
          </Box>
          <Box mt={1}>
            <Box textAlign="left">{gift.recipient}</Box>
          </Box>
        </Box>
      </Box>
      {!hidePriceAndActionButtons && (
        <Box display="flex" flexDirection="row">
          <Tooltip label="Editar" hasArrow bg="#FF0000">
            <IconButton
              onClick={() => handleEditGift(gift.id)}
              icon={<EditIcon />}
              bg="#FF0000"
              isRound="true"
              size="sm"
              mx={1}
            />
          </Tooltip>
          <Tooltip label="Duplicar" hasArrow bg="#FF0000">
            <IconButton
              onClick={() => handleDuplicateGift(gift.id)}
              icon={<CopyIcon />}
              bg="#FF0000"
              isRound="true"
              size="sm"
              mx={1}
            />
          </Tooltip>
          <Tooltip label="Eliminar" hasArrow bg="#FF0000">
            <IconButton
              onClick={() => setIsDeleteConfirmationOpen(true)}
              icon={<DeleteIcon />}
              bg="#FF0000"
              isRound="true"
              size="sm"
              mx={1}
            />
          </Tooltip>
        </Box>
      )}
      {isDeleteConfirmationOpen && (
        <ConfirmDeleteAlert
          onCloseDeleteConfirmation={() => setIsDeleteConfirmationOpen(false)}
          onDeleteConfirmation={() => {
            deleteGift(gift.id);
            setIsDeleteConfirmationOpen(false);
          }}
        />
      )}
    </StyledListItem>
  );
};

export default GiftRow;
