import {
    Box,
    Heading,
    VStack,
    Text,
    IconButton,
    useColorModeValue,
    Button,
  } from '@chakra-ui/react';
  import { RepeatIcon } from '@chakra-ui/icons';
  import { useTasks } from '../context/TaskContext';
  
  export default function TrashView() {
    const { deleted, dispatch } = useTasks();
    const bg = useColorModeValue('white', 'gray.700');
  
    return (
      <Box p={6}>
        <Heading mb={4} color="brand.600" textAlign="center">
          Papelera de Tareas
        </Heading>
        {deleted.length ? (
          <VStack spacing={4}>
            {deleted.map(task => (
              <Box
                key={task.id}
                p={4}
                bg={bg}
                boxShadow="sm"
                borderRadius="md"
                w="100%"
                maxW="600px"
              >
                <Text fontWeight="bold">{task.title}</Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {task.description}
                </Text>
                <Button
                  mt={2}
                  size="sm"
                  leftIcon={<RepeatIcon />}
                  onClick={() =>
                    dispatch({ type: 'RESTORE_TASK', payload: { id: task.id } })
                  }
                >
                  Restaurar
                </Button>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text textAlign="center" color="gray.500">
            La papelera está vacía.
          </Text>
        )}
      </Box>
    );
  }
  