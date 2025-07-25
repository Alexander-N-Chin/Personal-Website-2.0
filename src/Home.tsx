import { useRef } from 'react'
import Landing from './components/landing';

const Home = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Landing handleStart={scrollToSection}/>
  )
}

export default Home
