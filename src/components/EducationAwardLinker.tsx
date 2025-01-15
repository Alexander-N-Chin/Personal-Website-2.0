import React, { useState } from "react";
import { Box, Text, Wrap, WrapItem, VStack, Flex } from "@chakra-ui/react";

const educationAwardData = {
  education: [
    { id: "edu1", school: "The University of Texas at Austin", name: "Ph.D. in Electrical and Computer Engineering", awardIds: ["award4"], date: "Fall 2024 - Present" },
    { id: "edu2", school: "The University of Texas at Dallas", name: "B.S. in Computer Science", awardIds: ["award2", "award3", "award1", "award5"], date: "Fall 2021 - Spring 2024" },
    { id: "edu3", school: "George Ranch Highschool", name: "Highschool Diploma", awardIds: ["award6"], date: "Fall 2017 - Spring 2021" },
  ],
  awards: [
    { id: "award1", name: "Summa Cum Laude" },
    { id: "award2", name: "Computing Honors" },
    { id: "award3", name: "NSF REU Grant" },
    { id: "award4", name: "NSF Graduate Research Fellowship Program" },
    { id: "award5", name: "Academic Excellence Scholarship" },
    { id: "award6", name: "Top 10" },
  ],
};

const EducationAwardLinker = () => {
  const [highlightedEducation, setHighlightedEducation] = useState<string[]>([]);
  const [highlightedAwards, setHighlightedAwards] = useState<string[]>([]);

  const handleEducationClick = (educationId: string) => {
    const isAlreadyHighlighted = highlightedEducation.includes(educationId);

    if (isAlreadyHighlighted) {
      setHighlightedEducation([]);
      setHighlightedAwards([]);
    } else {
      const education = educationAwardData.education.find((edu) => edu.id === educationId);
      setHighlightedEducation([educationId]);
      setHighlightedAwards(education?.awardIds || []);
    }
  };

  const handleAwardClick = (awardId: string) => {
    const isAlreadyHighlighted = highlightedAwards.includes(awardId);

    if (isAlreadyHighlighted) {
      setHighlightedEducation([]);
      setHighlightedAwards([]);
    } else {
      const educationWithAward = educationAwardData.education.filter((edu) => edu.awardIds.includes(awardId));
      setHighlightedAwards([awardId]);
      setHighlightedEducation(educationWithAward.map((edu) => edu.id));
    }
  };

  return (
    <VStack spacing={4} width="100%" align="start" mb={5} mt={-5}>
      {/* Education List */}
      <Box width="100%">
        <Text fontSize="xl" mb={2} fontWeight="bold">
          Education
        </Text>
        <Box width="100%" border="1px solid #ddd" p={4} borderRadius="md">
            {educationAwardData.education.map((education) => {
            const isHighlighted = highlightedEducation.includes(education.id);
            return (
                <Box
                key={education.id}
                onClick={() => handleEducationClick(education.id)} // Changed to onClick
                cursor="pointer"
                transition="all 0.1s ease"
                fontWeight={isHighlighted ? "bold" : "normal"}
                opacity={isHighlighted ? 0.8 : 0.6}
                mb="8px"
                width="100%"
                >
                <Text fontStyle="italic">{education.school}</Text>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text>{education.name}</Text>
                    <Text>{education.date}</Text>
                </Flex>
                </Box>
            );
            })}
        </Box>
      </Box>

      {/* Awards List */}
      <Box>
        <Text fontSize="xl" mb={4} fontWeight="bold">
          Awards
        </Text>
        <Wrap lineHeight="0" spacing="20px">
          {educationAwardData.awards.map((award) => {
            const isHighlighted = highlightedAwards.includes(award.id);
            return (
              <WrapItem
                key={award.id}
                onClick={() => handleAwardClick(award.id)} // Changed to onClick
                cursor="pointer"
                transition="all 0.1s ease"
                fontWeight={isHighlighted ? "bold" : "normal"}
                opacity={isHighlighted ? 0.8 : 0.6}
                mb="8px"
              >
                {award.name}
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>
    </VStack>
  );
};

export default EducationAwardLinker;
