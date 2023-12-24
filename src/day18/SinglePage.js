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
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import AboutDayRequirementModal from "./components/AboutDayRequirementModal";
import requirementsData from "../requirements.json";
import ChristmasBackground from "../images/christmas-background.jpg";
import { nanoid } from "nanoid";
import NewGiftModal from "./components/NewGiftModal";
import { api } from "./api/api";
import { Spinner } from "@chakra-ui/react";
import GiftRow from "./components/GiftRow";

const SinglePage = ({ activeDay }) => {
  const buttonRef = useRef();

  const [gifts, setGifts] = useState([]);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openNewGiftModal, setOpenNewGiftModal] = useState(false);
  const [giftToBeEdited, setGiftToBeEdited] = useState(null);
  const [loadingGifts, setLoadingGifts] = useState(false);

  const activeDayRequirement = requirementsData.requirementsByDay.find(
    (item) => item.dayNumber === activeDay,
  );

  const get = () => {
    setLoadingGifts(true);
    api
      .gifts()
      .then((data) => setGifts(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingGifts(false));
  };

  const set = (newValues) => {
    api
      .save(newValues)
      .then((data) => setGifts(data.data))
      .catch((err) => console.log(err));
  };

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

    set(newGifts);
    setOpenNewGiftModal(false);
    setGiftToBeEdited(null);
  };

  const deleteGift = (giftId) => {
    const newGifts = gifts.filter((gift) => gift.id !== giftId);
    set(newGifts);
  };

  const handleEditGift = (giftId) => {
    const gift = gifts.find((gift) => gift.id === giftId);
    setGiftToBeEdited(gift);
    setOpenNewGiftModal(true);
  };

  const deleteAllGifts = () => {
    set([]);
  };

  const getTotal = () => {
    return gifts
      .reduce((accumulator, gift) => {
        const giftTotal = gift.price * gift.quantity;
        return accumulator + giftTotal;
      }, 0)
      .toFixed(2);
  };

  useEffect(() => {
    buttonRef.current.focus();
    get();
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
                  <GiftRow
                    gift={gift}
                    index={index}
                    handleEditGift={handleEditGift}
                    deleteGift={deleteGift}
                  />
                  {index < gifts.length - 1 && (
                    <Box bg="white">
                      <Divider orientation="horizontal" />
                    </Box>
                  )}
                </>
              ))}
              {!gifts.length && !loadingGifts && (
                <Box color="#2D3748" fontWeight="bold">
                  No hay regalos grinch! Agregá algo!
                </Box>
              )}
              {loadingGifts && <Spinner color="red.500" />}
            </Box>
            {gifts.length > 0 && (
              <Box pb={4}>
                <Box bg="black">
                  <Divider orientation="horizontal" />
                </Box>
                <Box
                  color="#2D3748"
                  fontWeight="bold"
                  pt={2}
                >{`Total: $${getTotal()}`}</Box>
              </Box>
            )}
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
