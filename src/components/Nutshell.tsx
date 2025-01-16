import {
  Center,
  Container,
  Heading,
  VStack,
} from '@chakra-ui/react';
import SkillProjectHighlighter from './SkillsAndProjects';
import EducationAwardLinker from './EducationAwardLinker';
  
const Nutshell = () => {
  return (
    <Container maxW="container.xl" pt={10} minHeight={"100vh"}>
        <VStack spacing={4} align="start">
          <Heading as="h2" size="2xl" textAlign="left">
            In a nutshell...
          </Heading>
          <SkillProjectHighlighter/>
          <EducationAwardLinker/>
        </VStack>
    </Container>
  );
};
  
export default Nutshell;
  