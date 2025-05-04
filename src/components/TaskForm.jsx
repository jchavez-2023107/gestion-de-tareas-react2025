import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function TaskForm() {
  const today = new Date().toISOString().substring(0, 10);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const navigate = useNavigate();
  const { dispatch } = useTasks();

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch({
      type: 'ADD_TASK',
      payload: { title, description, startDate, endDate },
    });
    navigate('/');
  };

  return (
    <Box maxW="md" mx="auto">
      <Heading size="lg" mb={4}>Nueva Tarea</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={3} isRequired>
          <FormLabel>Título</FormLabel>
          <Input
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            placeholder="Opcional"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Fecha inicio</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Fecha fin</FormLabel>
          <Input
            type="date"
            value={endDate}
            min={startDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">Agregar</Button>
      </form>
    </Box>
  );
}
