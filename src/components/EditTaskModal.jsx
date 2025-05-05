import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import React from 'react';

export default function EditTaskModal({ isOpen, onClose, task, dispatch }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
    }
  }, [task]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_TASK',
      payload: { 
        id: task.id, title, description, status, 
        startDate, endDate 
      },
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Tarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3} isRequired>
            <FormLabel>Título</FormLabel>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
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
          <FormControl mb={3} isRequired>
            <FormLabel>Estado</FormLabel>
            <Select
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="todo">Por hacer</option>
              <option value="inProgress">En progreso</option>
              <option value="completed">Completada</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
