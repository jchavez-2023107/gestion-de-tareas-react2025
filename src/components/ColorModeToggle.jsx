import React from 'react';
import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      size="lg"
      fontSize="1.5rem"
      colorScheme="brand"
      variant="solid"
      position="fixed"
      top="0.8rem"
      right="1.5rem"
      boxShadow="md"
      borderRadius="full"
      zIndex="tooltip"
    />
  );
}
