import React from 'react';
import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

// Ahora acepta props para posición personalizada desde App.jsx
export default function ColorModeToggle(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      size={props.size || 'md'}
      fontSize="1.5rem"
      colorScheme="brand"
      variant="solid"
      boxShadow="md"
      borderRadius="full"
      zIndex="tooltip"
      {...props} // posición y otros estilos pasarán desde el padre
    />
  );
}
