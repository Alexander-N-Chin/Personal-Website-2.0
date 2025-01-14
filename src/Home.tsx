import React, { useRef } from 'react'
import { Container } from '@chakra-ui/react';
import Landing from './components/landing';
import Nutshell from './components/Nutshell';
  
const Home = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    if (scrollRef.current) {
      //@ts-ignore
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container maxW="container.md" p={4}>
      <Landing handleStart={scrollToSection}/>
      {/* @ts-ignore */}
      <div ref={scrollRef}>
        <Nutshell/>
      </div>
    </Container>
  )
}

export default Home