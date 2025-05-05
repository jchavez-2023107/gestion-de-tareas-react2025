import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../context/TaskContext', () => ({
  useTasks: jest.fn(),
}));

describe('TaskForm', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    useTasks.mockReturnValue({ dispatch });
    useNavigate.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el formulario y agrega una tarea', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<TaskForm />);

    const titleInput = screen.getByPlaceholderText('Título');
    const descInput = screen.getByPlaceholderText('Opcional');
    // Ahora usamos regex para matchear insensiblemente
    const startDateInput = screen.getByLabelText(/Fecha inicio/i);
    const endDateInput   = screen.getByLabelText(/Fecha fin/i);
    const submitBtn      = screen.getByRole('button', { name: /Agregar/i });

    fireEvent.change(titleInput,     { target: { value: 'Nueva tarea' } });
    fireEvent.change(descInput,      { target: { value: 'Descripción' } });
    fireEvent.change(startDateInput, { target: { value: '2025-05-10' } });
    fireEvent.change(endDateInput,   { target: { value: '2025-05-11' } });
    fireEvent.click(submitBtn);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      payload: {
        title: 'Nueva tarea',
        description: 'Descripción',
        startDate: '2025-05-10',
        endDate: '2025-05-11',
      }
    });
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
