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
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { AddIcon } from "@chakra-ui/icons";
import AboutDayRequirementModal from "./components/AboutDayRequirementModal";
import ChristmasBackground from "../images/christmas-background.jpg";
import { nanoid } from "nanoid";
import NewGiftModal from "./components/NewGiftModal";
import { api } from "./api/api";
import { Spinner } from "@chakra-ui/react";
import GiftRow from "./components/GiftRow";
import PreviewModal from "./components/PreviewModal";
import { Volume2, VolumeX } from "react-feather";
import RandomSnowflakes from "./components/RandomSnowflakes";
import ConfirmDeleteAlert from "./components/ConfirmDeleteAlert";
import styled from "styled-components";

const StyledVStack = styled(VStack)`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledCard = styled(Card)`
  padding: 20px;
  border-radius: 1rem;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 36rem;
`;

const SinglePage = () => {
  const buttonRef = useRef();

  const [gifts, setGifts] = useState([]);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openNewGiftModal, setOpenNewGiftModal] = useState(false);
  const [giftToBeEdited, setGiftToBeEdited] = useState(null);
  const [giftToBeDuplicated, setGiftToBeDuplicated] = useState(null);
  const [loadingGifts, setLoadingGifts] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [muteSound, setMuteSound] = useState(true);
  const [isDeleteAllConfirmationOpen, setIsDeleteAllConfirmationOpen] =
    useState(false);

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
    setGiftToBeDuplicated(null);
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

  const handleDuplicateGift = (giftId) => {
    const gift = gifts.find((gift) => gift.id === giftId);

    if (gift) {
      const { id, ...giftWithoutId } = gift;
      setGiftToBeDuplicated(giftWithoutId);
      setOpenNewGiftModal(true);
    }
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

  useEffect(() => {
    const audioElement = document.getElementById("audio");
    if (!muteSound) {
      audioElement.play();
      audioElement.loop = true;
      audioElement.volume = 0.1;
    } else {
      audioElement.pause();
    }
  }, [muteSound]);

  return (
    <StyledVStack bgImage={ChristmasBackground}>
      <RandomSnowflakes />
      <StyledCard bg="#74d680">
        <CardHeader p={0}>
          <Heading size="lg" color="#378b29">
            Adviency 2023
          </Heading>
        </CardHeader>
        <CardBody px={2}>
          {/* Header Actions */}
          <Flex justify="space-between" align="center">
            <Flex flex="1">
              <Button
                colorScheme="red"
                ml={1}
                onClick={() => setOpenNewGiftModal(true)}
                ref={buttonRef}
                width="100%"
              >
                Agregar regalo
              </Button>
            </Flex>
            <Flex>
              <IconButton
                colorScheme="red"
                icon={<InfoIcon style={{ color: "black" }} size={17} />}
                onClick={() => setOpenAboutModal(true)}
                ml={1}
              />
            </Flex>
            <Flex>
              <IconButton
                colorScheme="red"
                icon={
                  muteSound ? (
                    <VolumeX style={{ color: "black" }} size={17} />
                  ) : (
                    <Volume2 style={{ color: "black" }} size={17} />
                  )
                }
                onClick={() => setMuteSound(!muteSound)}
                ml={1}
              />
            </Flex>
          </Flex>

          {/* Gift Rows */}
          <Box as="ul" maxH="416px" overflowY="auto" my={8}>
            {loadingGifts && <Spinner color="red.500" />}
            {(gifts || []).map((gift, index) => (
              <Box key={gift.id}>
                <GiftRow
                  gift={gift}
                  index={index}
                  handleEditGift={handleEditGift}
                  deleteGift={deleteGift}
                  handleDuplicateGift={handleDuplicateGift}
                />
                {index < gifts.length - 1 && (
                  <Box bg="white">
                    <Divider orientation="horizontal" />
                  </Box>
                )}
              </Box>
            ))}
            {!gifts.length && !loadingGifts && (
              <Box color="#2D3748" fontWeight="bold">
                No hay regalos grinch! Agregá algo!
              </Box>
            )}
          </Box>

          {/* Total */}
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

          {/* Footer Actions */}
          <Button
            colorScheme="red"
            width="100%"
            ml={1}
            onClick={() => setIsDeleteAllConfirmationOpen(true)}
            isDisabled={!gifts.length}
          >
            Borrar todo
          </Button>
          <Button
            colorScheme="red"
            width="100%"
            ml={1}
            mt={4}
            onClick={() => setOpenPreviewModal(true)}
            isDisabled={!gifts.length}
          >
            Previsualizar
          </Button>
        </CardBody>
      </StyledCard>
      <audio id="audio">
        <source src="/jingle-bells-bells-only.mp3" type="audio/mpeg" />
      </audio>
      {openAboutModal && (
        <AboutDayRequirementModal
          isOpen={openAboutModal}
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
            setGiftToBeDuplicated(null);
          }}
          giftToBeEdited={giftToBeEdited}
          giftToBeDuplicated={giftToBeDuplicated}
        />
      )}
      {openPreviewModal && (
        <PreviewModal
          isOpen={openPreviewModal}
          onClose={() => {
            setOpenPreviewModal(false);
          }}
          gifts={gifts}
        />
      )}
      {isDeleteAllConfirmationOpen && (
        <ConfirmDeleteAlert
          onCloseDeleteConfirmation={() =>
            setIsDeleteAllConfirmationOpen(false)
          }
          onDeleteConfirmation={() => {
            deleteAllGifts();
            setIsDeleteAllConfirmationOpen(false);
          }}
          isBulkDelete
        />
      )}
    </StyledVStack>
  );
};

export default SinglePage;
