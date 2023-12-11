import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Tooltip,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
} from "@chakra-ui/react";
import { InfoIcon, DeleteIcon } from "@chakra-ui/icons";
import AboutDayRequirementModal from "./components/AboutDayRequirementModal";
import requirementsData from "../requirements.json";
import ChristmasBackground from "../images/christmas-background.jpg";
import NewGiftPanel from "./components/NewGiftPanel";

const initialGifts = JSON.parse(localStorage.getItem("gifts")) || [];

const SinglePage = ({ activeDay }) => {
  const [gifts, setGifts] = useState(initialGifts);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const activeDayRequirement = requirementsData.requirementsByDay.find(
    (item) => item.dayNumber === activeDay,
  );

  const updateGiftsStateAndLocalStorage = (updatedGifts) => {
    setGifts(updatedGifts);
    localStorage.setItem("gifts", JSON.stringify(updatedGifts));
  };

  const saveNewGift = (giftName, giftQuantity) => {
    const newGifts = [
      ...gifts,
      {
        id: gifts.length + 1,
        name: giftName,
        quantity: giftQuantity,
      },
    ];
    updateGiftsStateAndLocalStorage(newGifts);
  };

  const deleteGift = (giftId) => {
    const newGifts = gifts.filter((gift) => gift.id !== giftId);
    updateGiftsStateAndLocalStorage(newGifts);
  };

  const deleteAllGifts = () => {
    updateGiftsStateAndLocalStorage([]);
  };

  return (
    <VStack
      bgImage={ChristmasBackground}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      height="100vh"
      flex={1}
      display="flex"
      flexDirection="column"
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <HStack
        bg="#FF7878"
        borderRadius="xl"
        p={4}
        width="450px"
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" size="lg" noOfLines={1} mr={1} color="#333333">
          {`Adviency - Día #${activeDay}`}
        </Heading>
        <Tooltip label="Acerca del Requerimiento" hasArrow bg="#FF0000">
          <IconButton
            onClick={() => setOpenAboutModal(true)}
            icon={<InfoIcon />}
            bg="#FF0000"
            isRound="true"
            size="sm"
          />
        </Tooltip>
      </HStack>
      <HStack my={8} width="450px">
        <Card bg="#74d680" p={6} borderRadius="xl" width="100%">
          <CardHeader p={0}>
            <Heading size="lg" color="#378b29">
              REGALOS
            </Heading>
          </CardHeader>
          <CardBody px={2}>
            <NewGiftPanel
              onSave={(giftName, giftQuantity) =>
                saveNewGift(giftName, giftQuantity)
              }
            />
            <Box as="ul" maxH="500px" overflowY="auto" my={8}>
              {(gifts || []).map((gift, index) => (
                <>
                  <Box
                    as="li"
                    key={gift.id}
                    py={4}
                    color="#2D3748"
                    fontWeight="bold"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box
                      textAlign="left"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {gift.name}&nbsp;
                      <Box
                        as="span"
                        color="#4A5568"
                      >{`(x${gift.quantity})`}</Box>
                    </Box>
                    <Tooltip label="Eliminar" hasArrow bg="#FF0000">
                      <IconButton
                        onClick={() => deleteGift(gift.id)}
                        icon={<DeleteIcon />}
                        bg="#FF0000"
                        isRound="true"
                        size="sm"
                        mx={3}
                      />
                    </Tooltip>
                  </Box>
                  {index < gifts.length - 1 && (
                    <Box bg="white">
                      <Divider orientation="horizontal" />
                    </Box>
                  )}
                </>
              ))}
              {!gifts.length && (
                <Box color="#2D3748" fontWeight="bold">
                  No hay regalos grinch! Agregá algo!
                </Box>
              )}
            </Box>
            <Button
              colorScheme="red"
              width="100%"
              ml={1}
              onClick={() => deleteAllGifts()}
            >
              Borrar todo
            </Button>
          </CardBody>
        </Card>
      </HStack>
      {openAboutModal && (
        <AboutDayRequirementModal
          isOpen={openAboutModal}
          activeDayRequirement={activeDayRequirement}
          onClose={() => setOpenAboutModal(false)}
        />
      )}
    </VStack>
  );
};

export default SinglePage;
