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
  
const Nutshell = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <Center h="100vh">
        <VStack spacing={8} align="start">
          <Heading as="h2" size="2xl" textAlign="left">
            In a nutshell...
          </Heading>
          <Text fontSize="xl" textAlign="left">
            I am an <b>electrical and computer engineering Ph.D student</b> at the University of Texas at Austin working in <a href="https://utinclab.com/">INC Lab</a> and <b>site reliability engineer</b> at Medallia. 
          </Text>
          <SkillProjectHighlighter/>
        </VStack>
      </Center>
    </Container>
  );
};
  
export default Nutshell;
  