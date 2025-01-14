import React, { useState } from "react";
import { Box, Text, Wrap, WrapItem, HStack} from "@chakra-ui/react";

const skillProjectData = {
  skills: [
    { id: "js", name: "JavaScript", projectIds: ["p1", "p2"] },
    { id: "react", name: "React", projectIds: ["p2", "p3"] },
    { id: "python", name: "Python", projectIds: ["p4"] },
  ],
  experiences: [
    { id: "p1", name: "Portfolio Website", skillIds: ["js"] },
    { id: "p2", name: "E-Commerce App", skillIds: ["js", "react"] },
  ],
  projects: [
    { id: "p3", name: "Dashboard Tool", skillIds: ["react"] },
    { id: "p4", name: "Data Analysis Script", skillIds: ["python"] },
  ],
};

const SkillProjectHighlighter = () => {
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([]);

  const handleSkillHover = (skillId: string) => {
    const skill = skillProjectData.skills.find((s) => s.id === skillId);
    setHighlightedSkills([skillId]); // Only highlight the hovered skill
    setHighlightedProjects(skill?.projectIds || []); // Highlight its related projects
  };

  const handleProjectHover = (projectId: string) => {
    const project = [
      ...skillProjectData.experiences,
      ...skillProjectData.projects,
    ].find((p) => p.id === projectId);
    setHighlightedProjects([projectId]); // Only highlight the hovered project
    setHighlightedSkills(project?.skillIds || []); // Highlight its related skills
  };

  const clearHighlights = () => {
    setHighlightedSkills([]);
    setHighlightedProjects([]);
  };

  return (
    <>
      {/* Skill List */}
      <Box>
        <Text fontSize="xl" mb={4} fontWeight="bold">
          Skills
        </Text>
        <Wrap spacing="20px">
          {skillProjectData.skills.map((skill) => {
            const isHighlighted = highlightedSkills.includes(skill.id); // Check if this skill is highlighted
            return (
              <WrapItem
                key={skill.id}
                onMouseEnter={() => handleSkillHover(skill.id)}
                onMouseLeave={clearHighlights}
                cursor="pointer"
              >
                <Box
                  transition="all 0.1s ease"
                  fontWeight={isHighlighted ? "bold" : "normal"}
                  opacity={isHighlighted ? 1 : 0.6}
                >
                  {skill.name}
                </Box>
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>

      <HStack spacing={4} width="100%">
        {/* Experiences List */}
        <Box width="50%">
          <Text fontSize="xl" mb={4} fontWeight="bold">
            Experiences
          </Text>
          {skillProjectData.experiences.map((experience) => {
            const isHighlighted = highlightedProjects.includes(experience.id); // Check if this experience is highlighted
            return (
              <Box
                key={experience.id}
                onMouseEnter={() => handleProjectHover(experience.id)}
                onMouseLeave={clearHighlights}
                cursor="pointer"
                transition="all 0.1s ease"
                fontWeight={isHighlighted ? "bold" : "normal"}
                opacity={isHighlighted ? 1 : 0.6}
              >
                {experience.name}
              </Box>
            );
          })}
        </Box>

        {/* Projects List */}
        <Box width="50%">
          <Text fontSize="xl" mb={4} fontWeight="bold">
            Projects
          </Text>
          {skillProjectData.projects.map((project) => {
            const isHighlighted = highlightedProjects.includes(project.id); // Check if this project is highlighted
            return (
              <Box
                key={project.id}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={clearHighlights}
                cursor="pointer"
                transition="all 0.1s ease"
                fontWeight={isHighlighted ? "bold" : "normal"}
                opacity={isHighlighted ? 1 : 0.6}
              >
                {project.name}
              </Box>
            );
          })}
        </Box>
      </HStack>
    </>
  );
};

export default SkillProjectHighlighter;
