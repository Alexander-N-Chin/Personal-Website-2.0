import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import SkillProjectHighlighter from './SkillsAndProjects';
import EducationAwardLinker from './EducationAwardLinker';
  
const Nutshell = () => {
  return (
    <Container maxW="container.xl" p={4} pt={10}>
      <Center h="100vh">
        <VStack spacing={4} align="start">
          <Heading as="h2" size="2xl" textAlign="left">
            In a nutshell...
          </Heading>
          <SkillProjectHighlighter/>
          <EducationAwardLinker/>
        </VStack>
      </Center>
    </Container>
  );
};
  
export default Nutshell;
  