import {
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
type Props = {
  handleStart: () => void;
};

const Landing = ({ handleStart }: Props) => {
  return (
    <Container minHeight={"100vh"}>
            <Center h="100vh">
            <VStack spacing={8} >
              <Heading as="h1" size="2xl" textAlign="center">
                Alexander N. Chin
              </Heading>
              <Text fontSize="xl" textAlign="center">
                Hello! Let me introduce myself.
              </Text>
              <Stack direction={['column', 'row']} spacing={4} >
                <Button colorScheme="teal" size="lg" onClick={handleStart}>
                  Get to know me
                </Button>
                <a href="/resume.pdf" download="resume.pdf">
                  <Button colorScheme="gray" size="lg" variant="outline">
                    Resume
                  </Button>
                </a>
              </Stack>
            </VStack>
        </Center>
          </Container>
  );
};

export default Landing;
