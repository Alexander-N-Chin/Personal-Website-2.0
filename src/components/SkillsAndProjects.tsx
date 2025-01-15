import { useState } from "react";
import { Box, Text, Wrap, WrapItem, HStack, VStack } from "@chakra-ui/react";
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { skillProjectData } from "./skillProjectData";

const SkillProjectHighlighter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    description: string;
    images: string[];
    date: string;
    title: string;
    links: string[];
  } | null>(null);

  const handleItemClick = (projectId: string) => {
    const project = [
      ...skillProjectData.experiences,
      ...skillProjectData.projects,
    ].find((p) => p.id === projectId);
    setSelectedItem({
      name: project?.name || "",
      description: project?.description || "",
      images: project?.images || [],
      date: project?.date || "",
      title: project?.title || "",
      links: project?.links || [],
    });
  };

  const handleSkillClick = (skillId: string) => {
    const isAlreadyHighlighted = highlightedSkills.includes(skillId); // Check if the skill is already highlighted

    if (isAlreadyHighlighted) {
      // Clear all highlights if the same skill is clicked again
      setHighlightedSkills([]);
      setHighlightedProjects([]);
    } else {
      // Highlight the selected skill and related projects
      const skill = skillProjectData.skills.find((s) => s.id === skillId);
      setHighlightedSkills([skillId]);
      setHighlightedProjects(skill?.projectIds || []);
    }
  };

  const handleExperienceClick = (experienceId: string) => {
    const isAlreadyHighlighted = highlightedProjects.includes(experienceId); // Check if the experience is already highlighted

    if (isAlreadyHighlighted) {
      // Clear all highlights if the same experience is clicked again
      setHighlightedSkills([]);
      setHighlightedProjects([]);
    } else {
      // Highlight the selected experience and related skills
      const experience = skillProjectData.experiences.find(
        (e) => e.id === experienceId
      );
      setHighlightedProjects([experienceId]);
      setHighlightedSkills(experience?.skillIds || []);
      handleItemClick(experienceId);
      onOpen();
    }
  };

  const handleProjectClick = (projectId: string) => {
    const isAlreadyHighlighted = highlightedProjects.includes(projectId); // Check if the project is already highlighted

    if (isAlreadyHighlighted) {
      // Clear all highlights if the same project is clicked again
      setHighlightedSkills([]);
      setHighlightedProjects([]);
    } else {
      // Highlight the selected project and related skills
      const project = skillProjectData.projects.find((p) => p.id === projectId);
      setHighlightedProjects([projectId]);
      setHighlightedSkills(project?.skillIds || []);
      handleItemClick(projectId);
      onOpen();
    }
  };

  return (
    <>
      {/* Skill List */}
      <Box>
        <Text fontSize="xl" mb={2} fontWeight="bold">
          Skills
        </Text>
        <Wrap
          lineHeight="1"
          spacing="13px"
          border="1px solid #ddd"
          p={4}
          borderRadius="md"
        >
          {skillProjectData.skills.map((skill) => {
            const isHighlighted = highlightedSkills.includes(skill.id); // Check if this skill is highlighted
            return (
              <WrapItem
                key={skill.id}
                onClick={() => handleSkillClick(skill.id)} // Updated to use click
                cursor="pointer"
              >
                <Box
                  transition="all 0.1s ease"
                  fontWeight={isHighlighted ? "bold" : "normal"}
                  opacity={isHighlighted ? 0.8 : 0.6}
                >
                  {skill.name}
                </Box>
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>

      <HStack spacing={4} width="100%" align="start">
        {/* Experiences List */}
        <Box width="45%">
          <Text fontSize="xl" mb={2} fontWeight="bold">
            Work Experience
          </Text>
          {skillProjectData.experiences.map((experience) => {
            const isHighlighted = highlightedProjects.includes(experience.id); // Check if this experience is highlighted
            return (
              <Box
                key={experience.id}
                onClick={() => handleExperienceClick(experience.id)} // Updated to use click
                cursor="pointer"
                transition="all 0.1s ease"
                fontWeight={isHighlighted ? "bold" : "normal"}
                opacity={isHighlighted ? 0.8 : 0.6}
                mb="8px"
              >
                {experience.name}
              </Box>
            );
          })}
        </Box>

        {/* Projects List */}
        <Box width="55%">
          <Text fontSize="xl" mb={2} fontWeight="bold">
            Projects
          </Text>
          {skillProjectData.projects.map((project) => {
            const isHighlighted = highlightedProjects.includes(project.id); // Check if this project is highlighted
            return (
              <Box
                key={project.id}
                onClick={() => handleProjectClick(project.id)} // Updated to use click
                cursor="pointer"
                transition="all 0.1s ease"
                fontWeight={isHighlighted ? "bold" : "normal"}
                opacity={isHighlighted ? 0.8 : 0.6}
                mb="8px"
              >
                {project.name}
              </Box>
            );
          })}
        </Box>
      </HStack>

      {/* Chakra UI Drawer for Selected Item */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} mt={4}>
              {selectedItem?.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${index + 1}`}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="xx-large">{selectedItem?.name}</DrawerHeader>
          <DrawerBody>
            <Text fontSize="x-large">{selectedItem?.title}</Text>
            <Text fontSize="large">{selectedItem?.date}</Text>
            <Text fontSize="large" mt={10}>Description:</Text>
            <Text mt={2}>{selectedItem?.description}</Text>
            <Text fontSize="large" mt={10}>Related Links:</Text>
            {selectedItem?.links.map((link, index) => (
              <Text key={index} mt={2} color="blue.500">
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Text>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SkillProjectHighlighter;
