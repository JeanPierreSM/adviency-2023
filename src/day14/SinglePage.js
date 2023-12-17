import React, { useState, useEffect, useRef } from "react";
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
import { InfoIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AboutDayRequirementModal from "./components/AboutDayRequirementModal";
import requirementsData from "../requirements.json";
import ChristmasBackground from "../images/christmas-background.jpg";
import { nanoid } from "nanoid";
import NewGiftModal from "./components/NewGiftModal";
import useLocalStorage from "./customHooks/useLocalStorage";

const SinglePage = ({ activeDay }) => {
  const buttonRef = useRef();

  const [gifts, setGifts] = useLocalStorage("gifts", []);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openNewGiftModal, setOpenNewGiftModal] = useState(false);
  const [giftToBeEdited, setGiftToBeEdited] = useState(null);
  const activeDayRequirement = requirementsData.requirementsByDay.find(
    (item) => item.dayNumber === activeDay,
  );

  const saveGift = async (newGiftObject, editMode) => {
    let newGifts = [];
    if (!editMode) {
      const newId = await nanoid();
      newGifts = [
        ...gifts,
        {
          id: newId,
          ...newGiftObject,
        },
      ];
    } else {
      newGifts = gifts.map((gift) =>
        gift.id === newGiftObject.id ? { ...gift, ...newGiftObject } : gift,
      );
    }
    setGifts(newGifts);

    setOpenNewGiftModal(false);
    setGiftToBeEdited(null);
  };

  const deleteGift = (giftId) => {
    const newGifts = gifts.filter((gift) => gift.id !== giftId);
    setGifts(newGifts);
  };

  const handleEditGift = (giftId) => {
    const gift = gifts.find((gift) => gift.id === giftId);
    setGiftToBeEdited(gift);
    setOpenNewGiftModal(true);
  };

  const deleteAllGifts = () => {
    setGifts([]);
  };

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

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
              ref={buttonRef}
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
                    <Box display="flex" flexDirection="row">
                      <Tooltip label="Editar" hasArrow bg="#FF0000">
                        <IconButton
                          onClick={() => handleEditGift(gift.id)}
                          icon={<EditIcon />}
                          bg="#FF0000"
                          isRound="true"
                          size="sm"
                          mx={3}
                        />
                      </Tooltip>
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
          onSave={(newGiftObject, editMode) =>
            saveGift(newGiftObject, editMode)
          }
          onClose={() => {
            setOpenNewGiftModal(false);
            setGiftToBeEdited(null);
          }}
          giftToBeEdited={giftToBeEdited}
        />
      )}
    </VStack>
  );
};

export default SinglePage;
