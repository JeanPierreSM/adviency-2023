import React, { useState } from "react";
import { Box, Tooltip, IconButton, Image, Spinner } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CopyIcon } from "@chakra-ui/icons";

const GiftRow = ({
  gift,
  index,
  handleEditGift,
  deleteGift,
  handleDuplicateGift,
  hidePriceAndActionButtons = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box
      as="li"
      key={gift.id}
      py={4}
      color="#2D3748"
      fontWeight="bold"
      display="flex"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="row">
        <Box w={12} h={12} mr={6}>
          {isLoading && <Spinner color="red.500" />}
          <Image
            src={gift.link}
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
              onClick={() => deleteGift(gift.id)}
              icon={<DeleteIcon />}
              bg="#FF0000"
              isRound="true"
              size="sm"
              mx={1}
            />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default GiftRow;
