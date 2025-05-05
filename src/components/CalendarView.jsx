import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
  Box,
  VStack,
  Text,
  Badge,
  useColorModeValue,
  Heading,
  HStack,
} from '@chakra-ui/react'
import { useTasks } from '../context/TaskContext'

export default function CalendarView() {
  const { tasks } = useTasks()
  const [date, setDate] = useState(new Date())
  const cardBg = useColorModeValue('white', 'gray.700')

  const parseDate = str => {
    const [y, m, d] = str.split('-')
    return new Date(+y, +m - 1, +d).getTime()
  }

  const selectedTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime()

  const tasksForDate = tasks.filter(t => {
    const s = parseDate(t.startDate)
    const e = parseDate(t.endDate)
    return selectedTime >= s && selectedTime <= e
  })

  return (
    <Box p={6}>
      <Heading size="lg" mb={4} color="brand.600" textAlign="center">
        Calendario de Tareas
      </Heading>

      <Box
        maxW="400px"
        w="full"
        mx="auto"
        boxShadow="md"
        borderRadius="md"
        overflow="hidden"
        mb={6}
      >
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date: d, view }) => {
            if (view !== 'month') return null
            const tileTime = new Date(
              d.getFullYear(),
              d.getMonth(),
              d.getDate()
            ).getTime()
            const count = tasks.filter(t => {
              const s = parseDate(t.startDate)
              const e = parseDate(t.endDate)
              return tileTime >= s && tileTime <= e
            }).length
            if (!count) return null
            return (
              <HStack justify="center" spacing="2px" mt={1}>
                {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                  <Box
                    key={i}
                    w="4px"
                    h="4px"
                    bg="brand.500"
                    borderRadius="full"
                  />
                ))}
                {count > 3 && (
                  <Text fontSize="xs" color="brand.500">+{count - 3}</Text>
                )}
              </HStack>
            )
          }}
          showNeighboringMonth={false}
        />
      </Box>

      {tasksForDate.length ? (
        <VStack spacing={3} align="stretch" maxW="600px" mx="auto">
          {tasksForDate.map(task => (
            <Box
              key={task.id}
              p={4}
              bg={cardBg}
              boxShadow="sm"
              borderRadius="md"
            >
              <Text fontWeight="bold">{task.title}</Text>
              {task.description && (
                <Text fontSize="sm" color="gray.500" mt={2}>
                  {task.description}
                </Text>
              )}
              <Text fontSize="xs" color="gray.400" mt={1}>
                Inicio: {task.startDate}
              </Text>
              <Text fontSize="xs" color="gray.400">
                Fin: {task.endDate}
              </Text>
              <Badge
                mt={2}
                colorScheme={
                  task.status === 'completed'
                    ? 'green'
                    : task.status === 'inProgress'
                    ? 'blue'
                    : 'orange'
                }
              >
                {task.status === 'completed'
                  ? 'Completada'
                  : task.status === 'inProgress'
                  ? 'En progreso'
                  : 'Por hacer'}
              </Badge>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text textAlign="center" color="gray.500">
          No hay tareas en esta fecha.
        </Text>
      )}
    </Box>
  )
}
