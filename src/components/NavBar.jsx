import { Flex, HStack, Box, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import ColorModeToggle from './ColorModeToggle';

export default function NavBar() {
  return (
    <Flex
      as="nav"
      bg="brand.600"
      px={6}
      py={4}
      align="center"
      justify="space-between"
    >
      <HStack spacing={4}>
        <Button
          as={NavLink}
          to="/"
          variant="ghost"
          color="white"
          _activeLink={{ bg: 'brand.700' }}
        >
          Lista
        </Button>
        <Button
          as={NavLink}
          to="/calendar"
          variant="ghost"
          color="white"
          _activeLink={{ bg: 'brand.700' }}
        >
          Calendario
        </Button>
        <Button
          as={NavLink}
          to="/trash"
          variant="ghost"
          color="white"
          _activeLink={{ bg: 'brand.700' }}
        >
          Papelera
        </Button>
      </HStack>

      <HStack spacing={4}>
        <Button
          as={NavLink}
          to="/new"
          colorScheme="teal"
          variant="solid"
          right="4.5rem"
        >
          Nueva Tarea
        </Button>
        <ColorModeToggle />
      </HStack>
    </Flex>
  );
}
