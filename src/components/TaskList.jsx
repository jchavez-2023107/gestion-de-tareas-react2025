import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Center,
  Text,
  Checkbox,
  IconButton,
  Flex,
  Spacer,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useTasks } from '../context/TaskContext';
import EditTaskModal from './EditTaskModal';

export default function TaskList() {
  const { tasks, dispatch } = useTasks();
  const bg = useColorModeValue('white', 'gray.700');
  const descColor = useColorModeValue('gray.700', 'gray.300');
  const [filter, setFilter] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState(null);

  const openEdit = (t) => {
    setCurrent(t);
    onOpen();
  };

  const filtered = tasks.filter((t) => filter === 'all' || t.status === filter);

  return (
    <Box>
      <Heading textAlign="center" my={6} color="brand.600">
        Mis Tareas
      </Heading>

      <Center mb={6}>
        <ButtonGroup isAttached variant="outline" colorScheme="brand">
          <Button onClick={() => setFilter('all')} isActive={filter === 'all'}>
            Todas
          </Button>
          <Button onClick={() => setFilter('todo')} isActive={filter === 'todo'}>
            Por hacer
          </Button>
          <Button
            onClick={() => setFilter('inProgress')}
            isActive={filter === 'inProgress'}
          >
            En progreso
          </Button>
          <Button
            onClick={() => setFilter('completed')}
            isActive={filter === 'completed'}
          >
            Completadas
          </Button>
        </ButtonGroup>
      </Center>

      <Center>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={6}
          maxW="800px"
          w="full"
          justifyItems="center"
        >
          {filtered.map((task) => (
            <Card
              key={task.id}
              bg={bg}
              boxShadow="md"
              borderRadius="lg"
              w="100%"
              minH="200px"
              p={4}
            >
              <CardHeader>
                <Flex align="center">
                  <Checkbox
                    isChecked={task.status === 'completed'}
                    colorScheme="brand"
                    onChange={() =>
                      dispatch({
                        type: 'CHANGE_STATUS',
                        payload: {
                          id: task.id,
                          status:
                            task.status === 'completed' ? 'todo' : 'completed',
                        },
                      })
                    }
                  />
                  <Text
                    ml={2}
                    as={task.status === 'completed' ? 's' : undefined}
                    fontWeight="semibold"
                  >
                    {task.title}
                  </Text>
                  <Spacer />
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<ChevronDownIcon />}
                      size="sm"
                      variant="outline"
                      mr={2}
                    />
                    <MenuList>
                      {['todo', 'inProgress', 'completed'].map((s) => (
                        <MenuItem
                          key={s}
                          onClick={() =>
                            dispatch({
                              type: 'CHANGE_STATUS',
                              payload: { id: task.id, status: s },
                            })
                          }
                        >
                          {s === 'todo'
                            ? 'Por hacer'
                            : s === 'inProgress'
                            ? 'En progreso'
                            : 'Completada'}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                  <IconButton
                    icon={<EditIcon />}
                    size="sm"
                    variant="outline"
                    mr={2}
                    onClick={() => openEdit(task)}
                  />
                  <IconButton
                    data-testid={`delete-${task.id}`}
                    aria-label="Eliminar tarea"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={() =>
                      dispatch({ type: 'DELETE_TASK', payload: { id: task.id } })
                    }
                  />
                </Flex>
              </CardHeader>

              <CardBody pt={2} pb={0}>
                {task.description && (
                  <Text color={descColor} fontSize="md" textAlign="center" mb={2}>
                    {task.description}
                  </Text>
                )}
              </CardBody>

              <CardFooter flexDirection="column" pt={0} pb={2}>
                <Center mb={1}>
                  <Badge
                    colorScheme={
                      task.status === 'completed'
                        ? 'green'
                        : task.status === 'inProgress'
                        ? 'blue'
                        : 'orange'
                    }
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {task.status === 'completed'
                      ? 'Completada'
                      : task.status === 'inProgress'
                      ? 'En progreso'
                      : 'Por hacer'}
                  </Badge>
                </Center>
                <Text fontSize="sm" color="brand.500" textAlign="center" mb={0}>
                  Inicio: {task.startDate}
                </Text>
                <Text fontSize="sm" color="brand.500" textAlign="center">
                  Fin: {task.endDate}
                </Text>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Center>

      {current && (
        <EditTaskModal
          isOpen={isOpen}
          onClose={onClose}
          task={current}
          dispatch={dispatch}
        />
      )}
    </Box>
  );
}
