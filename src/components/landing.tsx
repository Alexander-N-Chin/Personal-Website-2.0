import {
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
                Researcher & Site Reliability Engineer
              </Text>
              <Stack direction={['column', 'row']} spacing={4} >
                <Button as={Link} to="/nutshell" colorScheme="teal" size="lg">
                  Interactive Resume
                </Button>
                <a href="/resume.pdf" download="resume.pdf">
                  <Button colorScheme="gray" size="lg" variant="outline">
                    Normal Resume
                  </Button>
                </a>
              </Stack>
            </VStack>
        </Center>
          </Container>
  );
};

export default Landing;
