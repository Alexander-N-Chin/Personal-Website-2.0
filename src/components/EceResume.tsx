import SkillProjectHighlighter from './SkillsAndProjects';
import { skillProjectData } from './skillProjectData';

// Filter experiences and projects related to ECE research
const eceExperienceIds = ['e2', 'e3', 'e4']; // IDs of ECE research experiences
const eceProjectIds = ['p0', 'p8']; // IDs of projects related to ECE research

const filteredExperiences = skillProjectData.experiences.filter(exp => eceExperienceIds.includes(exp.id));
const filteredProjects = skillProjectData.projects.filter(proj => eceProjectIds.includes(proj.id));

// Filter skills related to filtered projects and experiences
const filteredSkillIds = new Set<string>();
filteredExperiences.forEach(exp => exp.skillIds.forEach(id => filteredSkillIds.add(id)));
filteredProjects.forEach(proj => proj.skillIds.forEach(id => filteredSkillIds.add(id)));
const filteredSkills = skillProjectData.skills.filter(skill => filteredSkillIds.has(skill.id));

const EceResume = () => {
  return (
    <SkillProjectHighlighter
      skills={filteredSkills}
      experiences={filteredExperiences}
      projects={filteredProjects}
    />
  );
};

export default EceResume;
