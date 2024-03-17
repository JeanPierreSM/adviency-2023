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
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import AboutDayRequirementModal from "./components/AboutDayRequirementModal";
import requirementsData from "../requirements.json";

const gifts = [
  { id: 1, name: "Medias" },
  { id: 2, name: "Caramelos" },
  { id: 3, name: "Vitel Tone" },
];

const SinglePage = ({ activeDay }) => {
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const activeDayRequirement = requirementsData.requirementsByDay.find(
    (item) => item.dayNumber === activeDay,
  );

  return (
    <VStack
      bg="linear-gradient(to bottom right, #feb2b2, #63171b)"
      flex={1}
      display="flex"
      flexDirection="column"
      h="100vh"
      w="100vw"
      alignItems-="center"
      justifyContent="center"
    >
      <HStack>
        <Heading as="h1" noOfLines={1} m={8} color="#BB2528">
          {`Adviency - Día #${activeDay}`}
        </Heading>
        <Tooltip label="Acerca" hasArrow bg="#EA4630">
          <IconButton
            onClick={() => setOpenAboutModal(true)}
            icon={<InfoIcon color="white" />}
            bg="#EA4630"
            isRound="true"
            size="sm"
          />
        </Tooltip>
      </HStack>
      <HStack my={8} p={4}>
        <Card bg="#146B3A" p={6} borderRadius="md">
          <CardHeader>
            <Heading size="md" color="#A0AEC0">
              REGALOS
            </Heading>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <ul>
              {gifts.map((gift, index) => (
                <>
                  <Box
                    as="li"
                    key={gift.id}
                    py={4}
                    px={8}
                    color="#EDF2F7"
                    fontWeight="bold"
                  >
                    {gift.name}
                  </Box>
                  {index < gifts.length - 1 && (
                    <Divider orientation="horizontal" />
                  )}
                </>
              ))}
            </ul>
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
