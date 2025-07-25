import {
  Button,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  handleStart: () => void;
};

const Landing = ({ handleStart }: Props) => {
  const leftRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOnMove = (e: MouseEvent | Touch) => {
      const clientX = e instanceof Touch ? e.clientX : (e as MouseEvent).clientX;
      const p = (clientX / window.innerWidth) * 100;

      if (leftRef.current) {
        leftRef.current.style.width = `${p}%`;
      }
    };

    const onMouseMove = (e: MouseEvent) => handleOnMove(e);
    const onTouchMove = (e: TouchEvent) => handleOnMove(e.touches[0]);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <>
      <div id="left-side" ref={leftRef} className="side">
        <Heading className="title" fontSize="6vw">
        </Heading>
        <Text className="title" fontSize="xl">
          Hello! My name is Alex, and I am a <span className='fancy'>researcher</span>.
        </Text>
        <Stack direction={['column', 'row']} spacing={4}>
          <Button as={Link} to="/nutshell" color="white" bgColor="black" size="lg" variant="solid">
            Interactive Resume
          </Button>
          <a href="/resume.pdf" download="resume.pdf">
            <Button colorScheme="black" size="lg" variant="outline">
              Normal Resume
            </Button>
          </a>
        </Stack>
      </div>
      <div id="right-side" className="side">
        <Heading className="title" fontSize="6vw">
        </Heading>
        <Text className="title" fontSize="xl">
          Hello! My name is Alex, and I am a <span className='fancy'>site reliability engineer</span>.
        </Text>
        <Stack direction={['column', 'row']} spacing={4}>
          <Button as={Link} to="/nutshell" bgColor="white" color="black" size="lg">
            Interactive Resume
          </Button>
          <a href="/resume.pdf" download="resume.pdf">
            <Button colorScheme="gray" color="white" size="lg" variant="outline">
              Normal Resume
            </Button>
          </a>
        </Stack>
      </div>
    </>
  );
};

export default Landing;
