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
  Image,
} from "@chakra-ui/react";
import { InfoIcon, DeleteIcon } from "@chakra-ui/icons";
import AboutDayRequirementModal from "./components/AboutDayRequirementModal";
import requirementsData from "../requirements.json";
import ChristmasBackground from "../images/christmas-background.jpg";
import { nanoid } from "nanoid";
import NewGiftModal from "./components/NewGiftModal";

const initialGifts = JSON.parse(localStorage.getItem("gifts")) || [];

const SinglePage = ({ activeDay }) => {
  const [gifts, setGifts] = useState(initialGifts);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openNewGiftModal, setOpenNewGiftModal] = useState(false);
  const activeDayRequirement = requirementsData.requirementsByDay.find(
    (item) => item.dayNumber === activeDay,
  );

  const updateGiftsStateAndLocalStorage = (updatedGifts) => {
    setGifts(updatedGifts);
    localStorage.setItem("gifts", JSON.stringify(updatedGifts));
  };

  const saveNewGift = async (newGiftObject) => {
    const newId = await nanoid();
    const newGifts = [
      ...gifts,
      {
        id: newId,
        ...newGiftObject,
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
        width="580px"
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
      <HStack my={8} width="580px">
        <Card bg="#74d680" p={6} borderRadius="xl" width="100%">
          <CardHeader p={0}>
            <Heading size="lg" color="#378b29">
              REGALOS
            </Heading>
          </CardHeader>
          <CardBody px={2}>
            <Button
              colorScheme="red"
              width="100%"
              ml={1}
              onClick={() => setOpenNewGiftModal(true)}
            >
              Agregar regalo
            </Button>

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
                    <Box display="flex" flexDirection="row">
                      <Box w={12} h={12} mr={6}>
                        <Image
                          src={gift.link}
                          borderRadius="full"
                          alt={`#${index}-image`}
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
                          <Box
                            as="span"
                            color="#4A5568"
                          >{`(x${gift.quantity})`}</Box>
                        </Box>
                        <Box mt={1}>
                          <Box textAlign="left">{gift.recipient}</Box>
                        </Box>
                      </Box>
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
      {openNewGiftModal && (
        <NewGiftModal
          isOpen={openNewGiftModal}
          onSave={(newGiftObject) => {
            saveNewGift(newGiftObject);
            setOpenNewGiftModal(false);
          }}
          onClose={() => setOpenNewGiftModal(false)}
        />
      )}
    </VStack>
  );
};

export default SinglePage;
