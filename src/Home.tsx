import { useRef } from 'react'
import { Container, VStack } from '@chakra-ui/react';
import Landing from './components/landing';
import Nutshell from './components/Nutshell';
  
const Home = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container maxW="container.md" p={10}>
      <VStack spacing={8}>
      <Landing handleStart={scrollToSection}/>
      {/* @ts-ignore */}
      <div ref={scrollRef}>
        <Nutshell/>
      </div>
      </VStack>
    </Container>
  )
}

export default Home