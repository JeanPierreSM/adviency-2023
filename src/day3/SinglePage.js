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
  Image,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import AboutDayRequirementModal from "./components/AboutDayRequirementModal";
import requirementsData from "../requirements.json";
import ChristmasBackground from "../images/christmas-background.jpg";
import NewGiftPanel from "./components/NewGiftPanel";

const initialGifts = [
  { id: 1, name: "Medias" },
  { id: 2, name: "Caramelos" },
  { id: 3, name: "Vitel Tone" },
];

const SinglePage = ({ activeDay }) => {
  const [gifts, setGifts] = useState(initialGifts);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const activeDayRequirement = requirementsData.requirementsByDay.find(
    (item) => item.dayNumber === activeDay,
  );

  const saveNewGift = (giftName) => {
    setGifts([
      ...gifts,
      {
        id: gifts.length + 1,
        name: giftName,
      },
    ]);
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
        width="380px"
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" size="lg" noOfLines={1} mr={1} color="#333333">
          {`Adviency - Día #${activeDay}`}
        </Heading>
        <Tooltip label="Acerca del Requerimiento" hasArrow bg="#FF0000">
          <IconButton
            onClick={() => setOpenAboutModal(true)}
            icon={<InfoIcon color="#CBD5E0" />}
            bg="#FF0000"
            isRound="true"
            size="sm"
          />
        </Tooltip>
      </HStack>
      <HStack my={8} width="380px">
        <Card bg="#74d680" p={6} borderRadius="xl" width="100%">
          <CardHeader p={0}>
            <Heading size="lg" color="#378b29">
              REGALOS
            </Heading>
          </CardHeader>
          <CardBody px={2}>
            <NewGiftPanel handleSave={(giftName) => saveNewGift(giftName)} />
            <Box as="ul" maxH="500px" overflowY="auto" mt={6}>
              {gifts.map((gift, index) => (
                <>
                  <Box
                    as="li"
                    key={gift.id}
                    py={4}
                    color="#2D3748"
                    fontWeight="bold"
                  >
                    {gift.name}
                  </Box>
                  {index < gifts.length - 1 && (
                    <Box bg="white">
                      <Divider orientation="horizontal" />
                    </Box>
                  )}
                </>
              ))}
            </Box>
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
