import {
  Heading,
  VStack,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EceResume from './EceResume';
import CsSreResume from './CsSreResume';
import EducationAwardLinker from './EducationAwardLinker';

const Nutshell = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [tabIndex, setTabIndex] = useState(1);
  const [bgColor, setBgColor] = useState('gray.800');

  useEffect(() => {
    if (tabIndex === 1 && colorMode !== 'dark') {
      setBgColor('gray.800');
      const timeout = setTimeout(() => {
        setColorMode('dark');
      }, 500);
      return () => clearTimeout(timeout);
    } else if (tabIndex === 0 && colorMode !== 'light') {
      setBgColor('white');
      const timeout = setTimeout(() => {
        setColorMode('light');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [tabIndex, colorMode, setColorMode]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        bg={bgColor}
        zIndex={-1}
        transition="background-color 0.5s ease"
      />
      <Box
        position="relative"
        minHeight="100vh"
        width={['100%', null, null, '40%']}
        mx="auto"
        px={[4, 6, 8]}
        pt={10}
        boxSizing="border-box"
      >
        <VStack spacing={4} align="start" maxW="container.xl" mx="auto">
          <Heading as="h2" size="2xl" textAlign="left">
            Go on and click around!
          </Heading>
          <Tabs variant="enclosed" width="100%" index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>ECE Research</Tab>
              <Tab>CS / SRE</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <EceResume />
              </TabPanel>
              <TabPanel p={0}>
                <CsSreResume />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <div style={{ marginTop: '2rem' }}>
            <EducationAwardLinker />
          </div>
          <Button as={Link} to="/" colorScheme="teal" mt={8} mb={8} alignSelf="center">
            Back to Landing
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Nutshell;
