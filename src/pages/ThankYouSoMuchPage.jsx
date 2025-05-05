import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Checkbox,
  Collapse,
  Divider,
  Button,
  useColorModeValue,
  Center,
  Spinner,
} from '@chakra-ui/react';

export default function ThankYouSoMuchPage() {
  const [loading, setLoading] = useState(true);
  const dividerColor = useColorModeValue('gray.300', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  const titles = [
    'Preparación Previa',
    'Introducción (1 min)',
    'Explicación Técnica (3 min)',
    'Demostración en Vivo (5 min)',
    'Cierre (1 min)',
  ];

  const scripts = [
    `Ejecuta \`npm install\`, luego \`npm run dev\` y abre la app en localhost. Comprueba con \`npm test\` que pasen todas las pruebas e inserta seis tareas de ejemplo.`,
    `Hola, soy Joel Alejandro Chávez Pérez. Programar me apasiona porque convierte ideas en realidad sin altos costos. Esta app gestiona tareas con fechas, estados y vistas de lista y calendario usando React, React Router, Chakra UI, Context/useReducer y Jest.`,
    `La arquitectura separa componentes en src/components y rutas en App.jsx con Suspense y lazy loading. El estado global se maneja con React Context y useReducer para acciones CRUD, cambios de estado y papelera. Se implementaron pruebas unitarias con React Testing Library en los componentes clave.`,
    `En vivo: creo una nueva tarea con título, descripción y fecha. Cambio estados desde lista, filtro por categoría, edito en modal, elimino a papelera y resto en Trash. En calendario veo indicadores de tareas y detalles al seleccionar un día.`,
    `Cerramos demostrando creación, filtrado, navegación y pruebas. Este proyecto muestra mis habilidades como Frontend Developer. Gracias por su atención.`,
  ];

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(id);
  }, []);

  if (loading) {
    return (
      <Center flexDirection="column" py={10}>
        <Spinner size="xl" mb={4} />
        <Text fontSize="lg" color="gray.500">
          Cargando vista, por favor espera…
        </Text>
      </Center>
    );
  }

  return (
    <Box maxW="container.md" mx="auto" py={8} px={{ base: 4, md: 8 }}>
      <VStack spacing={6} align="stretch">
        <Heading textAlign="center" color="brand.600">
          ¡Gracias!
        </Heading>
        <Text textAlign="center" fontSize="lg">
          Agradezco a <strong>Cesar Ticona</strong>, al equipo de{' '}
          <strong>Ada School</strong> y a todas las personas que me apoyaron en este proceso de certificación Front End Developer.
        </Text>

        <Divider borderColor={dividerColor} />
        <Heading size="md">Presentación de Proyecto</Heading>

        {titles.map((title, i) => (
          <Box key={i}>
            <Checkbox mb={2} colorScheme="brand">{title}</Checkbox>
            <Collapse in={true} animateOpacity>
              <Text pl={6} textAlign="justify" color={textColor}>
                {scripts[i]}
              </Text>
            </Collapse>
            {i < titles.length - 1 && <Divider borderColor={dividerColor} mt={4} />}
          </Box>
        ))}

        <Divider borderColor={dividerColor} />
        <Text textAlign="center" fontSize="lg">
          ¡Eso es todo! Gracias por todo y espero que tengan un excelente resto de la semana.
        </Text>
        <Button as="a" href="/" colorScheme="teal" alignSelf="center">
          Volver al inicio
        </Button>
      </VStack>
    </Box>
  );
}
