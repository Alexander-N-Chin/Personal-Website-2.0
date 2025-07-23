import SkillProjectHighlighter from './SkillsAndProjects';
import { skillProjectData } from './skillProjectData';

// Filter experiences and projects related to CS/SRE
const csSreExperienceIds = ['e1', 'e5']; // IDs of CS/SRE experiences
const csSreProjectIds = ['p1', 'p5', 'p2', 'p3', 'p4', 'p6', 'p7']; // IDs of projects related to CS/SRE

const filteredExperiences = skillProjectData.experiences.filter(exp => csSreExperienceIds.includes(exp.id));
const filteredProjects = skillProjectData.projects.filter(proj => csSreProjectIds.includes(proj.id));

// Filter skills related to filtered projects and experiences
const filteredSkillIds = new Set<string>();
filteredExperiences.forEach(exp => exp.skillIds.forEach(id => filteredSkillIds.add(id)));
filteredProjects.forEach(proj => proj.skillIds.forEach(id => filteredSkillIds.add(id)));
const filteredSkills = skillProjectData.skills.filter(skill => filteredSkillIds.has(skill.id));

const CsSreResume = () => {
  return (
    <SkillProjectHighlighter
      skills={filteredSkills}
      experiences={filteredExperiences}
      projects={filteredProjects}
    />
  );
};

export default CsSreResume;
