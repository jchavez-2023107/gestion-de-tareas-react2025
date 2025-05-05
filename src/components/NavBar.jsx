import React from 'react';
import { Flex, HStack, Box, Button, useBreakpointValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import ColorModeToggle from './ColorModeToggle';

export default function NavBar() {
  const btnSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Flex
      as="nav"
      bg="brand.600"
      px={{ base: 4, md: 8 }}
      py={4}
      align="center"
    >
      {/* Left links */}
      <HStack spacing={4}>
        <Button
          as={NavLink}
          to="/"
          end
          variant="ghost"
          color="white"
          size={btnSize}
          _activeLink={{ bg: 'brand.700' }}
        >
          Lista
        </Button>
        <Button
          as={NavLink}
          to="/calendar"
          variant="ghost"
          color="white"
          size={btnSize}
          _activeLink={{ bg: 'brand.700' }}
        >
          Calendario
        </Button>
        <Button
          as={NavLink}
          to="/trash"
          variant="ghost"
          color="white"
          size={btnSize}
          _activeLink={{ bg: 'brand.700' }}
        >
          Papelera
        </Button>
      </HStack>

      {/* Spacer */}
      <Box flex={1} />

      {/* Right links */}
      <HStack spacing={4} mr={{ base: 2, md: 4 }}>
        <Button
          as={NavLink}
          to="/thank-you"
          variant="ghost"
          color="white"
          size={btnSize}
          _activeLink={{ bg: 'brand.700' }}
        >
          Agradecimientos
        </Button>
        <Button
          as={NavLink}
          to="/new"
          colorScheme="teal"
          variant="solid"
          size={btnSize}
        >
          Nueva Tarea
        </Button>
        
      </HStack>
    </Flex>
  );
}