import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function ThankYouSoMuchPage() {
  const [repo, setRepo] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // aquí podrías guardar o navegar con el enlace
    alert(`Repositorio enviado: ${repo}`);
  };

  return (
    <Box maxW="container.md" mx="auto" py={8} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading textAlign="center" color="brand.600">
          ¡Gracias!
        </Heading>

        <Text fontSize="lg">
          Quiero agradecer especialmente a <strong>Cesar Ticona</strong>, al equipo de <strong>Ada School</strong> y a todas las personas que me acompañaron en este proceso de certificación como Front End Developer.
        </Text>

        <Divider />

        <Heading size="md">Presentación de Proyecto</Heading>
        <Text>
          Proyecto Certificado: <strong>Front End Nivel Medio con JavaScript React</strong>
        </Text>

        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <strong>Preparación Previa:</strong> verifica que todo funcione y practica tu demo.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <strong>Introducción (1 min):</strong> preséntate, explica objetivo y tecnologías.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <strong>Explicación Técnica (3 min):</strong> arquitectura, Context/useReducer, pruebas unitarias.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <strong>Demostración en Vivo (5 min):</strong> CRUD, navegación, UI.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <strong>Cierre (1 min):</strong> concluye y abre preguntas.
          </ListItem>
        </List>

        <Divider />

        <FormControl as="form" onSubmit={handleSubmit}>
          <FormLabel>Enlace de tu repositorio</FormLabel>
          <Input
            placeholder="https://github.com/usuario/repositorio"
            value={repo}
            onChange={e => setRepo(e.target.value)}
          />
          <Button type="submit" mt={4} colorScheme="brand">
            Enviar enlace
          </Button>
        </FormControl>
      </VStack>
    </Box>
  );
}
