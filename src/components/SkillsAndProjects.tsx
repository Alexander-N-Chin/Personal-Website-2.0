import { useState } from "react";
import { Box, Text, Wrap, WrapItem, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";

interface Skill {
  id: string;
  name: string;
  projectIds: string[];
}

interface Experience {
  id: string;
  name: string;
  skillIds: string[];
  description: string;
  images: string[];
  date: string;
  title: string;
  links: string[];
}

interface Project {
  id: string;
  name: string;
  skillIds: string[];
  description: string;
  images: string[];
  date: string;
  title: string;
  links: string[];
}

type Props = {
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
};

const SkillProjectHighlighter = ({ skills, experiences, projects }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<Experience | Project | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleItemClick = (projectId: string) => {
    const project = [...experiences, ...projects].find((p) => p.id === projectId);
    setSelectedItem(project || null);
  };

  const handleSkillClick = (skillId: string) => {
    const isAlreadyHighlighted = highlightedSkills.includes(skillId);

    if (isAlreadyHighlighted) {
      setHighlightedSkills([]);
      setHighlightedProjects([]);
    } else {
      const skill = skills.find((s) => s.id === skillId);
      setHighlightedSkills([skillId]);
      setHighlightedProjects(skill?.projectIds || []);
    }
  };

  const handleExperienceClick = (experienceId: string) => {
    const isAlreadyHighlighted = highlightedProjects.includes(experienceId);

    if (isAlreadyHighlighted) {
      setHighlightedSkills([]);
      setHighlightedProjects([]);
    } else {
      const experience = experiences.find((e) => e.id === experienceId);
      setHighlightedProjects([experienceId]);
      setHighlightedSkills(experience?.skillIds || []);
      handleItemClick(experienceId);
      onOpen();
    }
  };

  const handleProjectClick = (projectId: string) => {
    const isAlreadyHighlighted = highlightedProjects.includes(projectId);

    if (isAlreadyHighlighted) {
      setHighlightedSkills([]);
      setHighlightedProjects([]);
    } else {
      const project = projects.find((p) => p.id === projectId);
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
          {skills.map((skill) => {
            const isHighlighted = highlightedSkills.includes(skill.id);
            return (
              <WrapItem
                key={skill.id}
                onClick={() => handleSkillClick(skill.id)}
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

      <HStack spacing={4} width="100%" align="start" direction={['column', 'row']}>
        {/* Experiences List */}
        <Box width={['100%', '45%']}>
          <Text fontSize="xl" mb={2} fontWeight="bold">
            Work Experience
          </Text>
          {experiences.map((experience) => {
            const isHighlighted = highlightedProjects.includes(experience.id);
            return (
              <Box
                key={experience.id}
                onClick={() => handleExperienceClick(experience.id)}
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
        <Box width={['100%', '55%']}>
          <Text fontSize="xl" mb={2} fontWeight="bold">
            Projects
          </Text>
          {projects.map((project) => {
            const isHighlighted = highlightedProjects.includes(project.id);
            return (
              <Box
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
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

      {/* Conditional Drawer Rendering */}
      {isMobile ? (
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full" trapFocus={false} blockScrollOnMount={false}>
          <DrawerContent pt={30}>
            <DrawerCloseButton />
            <DrawerHeader fontSize="xx-large">{selectedItem?.name}</DrawerHeader>
            <DrawerBody overflowY={"auto"}>
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
      ) : (
        <>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={['xs', 'sm', 'md']} trapFocus={false} blockScrollOnMount={false} >
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

          <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={['xs', 'sm', 'md']} trapFocus={false} blockScrollOnMount={false} >
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader fontSize="xx-large">{selectedItem?.name}</DrawerHeader>
              <DrawerBody overflowY={"auto"}>
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
      )}
    </>
  );
};

export default SkillProjectHighlighter;
