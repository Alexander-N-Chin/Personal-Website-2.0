import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Text,
  Tooltip,
  Collapse,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

type TimelineEvent = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const events: TimelineEvent[] = [
  {
    id: 1,
    title: 'Event One',
    date: '2020-01-01',
    description: 'Description for event one. This is an example event on the timeline.',
  },
  {
    id: 2,
    title: 'Event Two',
    date: '2020-06-15',
    description: 'Description for event two. More details can be shown here.',
  },
  {
    id: 3,
    title: 'Event Three',
    date: '2021-03-10',
    description: 'Description for event three. Click to expand and see more.',
  },
  {
    id: 4,
    title: 'Event Four',
    date: '2025-08-25',
    description: 'Description for event four. This event is interactive.',
  },
];

const Timeline = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgLayers = useRef<(HTMLDivElement | null)[]>([]);
  const ticking = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          bgLayers.current.forEach((layer, i) => {
            if (layer) {
              const speed = [0.05, 0.1, 0.15, 0.2, 0.35][i]; // match the speeds
              layer.style.backgroundPosition = `calc(50% - ${scrollLeft * speed}px) bottom`;
            }
          });
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEventClick = (event: TimelineEvent) => {
    setExpandedId(expandedId === event.id ? null : event.id);
    setSelectedEvent(event);
    onOpen();
  };

  // Calculate min and max dates in milliseconds
  const dates = events.map(e => new Date(e.date).getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const totalDuration = maxDate - minDate;

  // Map date to position in pixels (e.g., 1000px total width)
  const pixelsPerDay = 2; // spacing per day in pixels
  const totalDays = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));
  const timelineWidth = totalDays * pixelsPerDay + 200; // add padding 100px on each side

  const getPosition = (dateStr: string) => {
    const dateMs = new Date(dateStr).getTime();
    return ((dateMs - minDate) / totalDuration) * (timelineWidth - 200) + 100; // offset by 100px padding
  };

  return (
    <>
      {/* Fixed Title */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        bg="transparent"
        zIndex={10}
        p={4}
        textAlign="center"
      >
        <Text fontSize="4xl" fontWeight="bold" color="white" className='fancy'>
          My career on a line...
        </Text>
      </Box>

      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        backgroundImage="url('/background/layer0.jpg')" // ⬅️ your image path
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        zIndex={-10}
      />

      {/* Parallax Background */}
      {[0.05, 0.1, 0.15, 0.2, 0.35].map((speed, i) => (
        <Box
          key={i}
          ref={el => (bgLayers.current[i] = el)}
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          height="100%"
          backgroundImage={`url('/background/layer${i+1}.png')`}
          backgroundRepeat="repeat-x"
          backgroundSize="70vh"
          backgroundPosition="bottom"
          zIndex={-5 + i} // e.g., -3, -2, -1
          pointerEvents="none"
        />
      ))}

      {/* Timeline Content */}
      <Box
        p={6}
        maxW="100vw"
        overflowX="auto"
        ref={scrollRef}
        mx="auto"
        bg="transparent"
        minH="100vh"
        position="relative"
        pt="48px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Timeline horizontal line */}
        <Box
          position="absolute"
          left={100}
          top="50%"
          width={timelineWidth+100}
          height="4px"
          bg="blue.300"
          marginLeft={0}
          zIndex={0}
        />
        <Box
          position="relative"
          height="160px"
          width={timelineWidth}
          ref={scrollRef}
          mx="auto"
        >
          {/* Year tick markers */}
          {(() => {
            const startYear = 2020;
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let year = startYear; year <= currentYear+1; year++) {
              const dateStr = `${year}-01-01`;
              const leftPos = getPosition(dateStr);
              years.push(
                <Box key={year} position="absolute" top="30%" left={leftPos} transform="translateX(-50%)" zIndex={1}>
                  <Box width="2px" height="50px" bg="blue.500" mx="auto" />
                  <Text fontSize="xs" color="white" mt={1} textAlign="center" userSelect="none">
                    {year}
                  </Text>
                </Box>
              );
            }
            return years;
          })()}
          {events.map((event) => {
            const leftPos = getPosition(event.date);
            const isExpanded = expandedId === event.id;
            return (
              <Box
                key={event.id}
                position="absolute"
                top="73%"
                left={leftPos}
                cursor="pointer"
                onClick={() => handleEventClick(event)}
                minW="180px"
                p={4}
        bg={isExpanded ? 'rgba(191, 219, 254, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
                borderRadius="md"
                boxShadow="md"
                _hover={{ bg: 'blue.50' }}
                transition="background-color 0.3s"
              >
                {/* Event marker */}
                <Box
                  position="absolute"
                  top="-54px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="16px"
                  height="16px"
                  bg={isExpanded ? 'blue.600' : 'blue.400'}
                  borderRadius="50%"
                  border="3px solid white"
                  boxShadow="0 0 5px rgba(0,0,0,0.2)"
                  zIndex={2}
                />
                {/* Connector line from marker to event card */}
                <Box
                  position="absolute"
                  top="-50px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="2px"
                  height="50px"
                  bg="blue.300"
                  zIndex={1}
                />
                <Tooltip label={event.title} aria-label={`${event.title} tooltip`}>
                  <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                    {event.title}
                  </Text>
                </Tooltip>
                <Text fontSize="sm" color="gray.600">
                  {event.date}
                </Text>
                <Collapse in={isExpanded} animateOpacity>
                  <Box mt={2} fontSize="sm" color="gray.700" maxW="200px" textAlign="center">
                    {event.description}
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </Box>
      {/* Modal for event details */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEvent?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {selectedEvent?.date}
            </Text>
            <Text fontSize="md" color="gray.800">
              {selectedEvent?.description}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Timeline;
