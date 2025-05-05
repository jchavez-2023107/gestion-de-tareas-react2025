import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';
import '@testing-library/jest-dom';

jest.mock('../context/TaskContext', () => ({
  useTasks: jest.fn(),
}));

describe('TaskList', () => {
  let dispatch;
  const sampleTasks = [
    { id: '1', title: 'T1', description: '', status: 'todo', startDate: '2025-05-01', endDate: '2025-05-02' },
    { id: '2', title: 'T2', description: '', status: 'completed', startDate: '2025-05-01', endDate: '2025-05-01' },
  ];

  beforeEach(() => {
    dispatch = jest.fn();
    useTasks.mockReturnValue({ tasks: sampleTasks, dispatch });
  });

  afterEach(() => jest.clearAllMocks());

  it('muestra todas las tareas por defecto y filtra correctamente', () => {
    render(<TaskList />);
    expect(screen.getByText('T1')).toBeInTheDocument();
    expect(screen.getByText('T2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Por hacer' }));
    expect(screen.getByText('T1')).toBeInTheDocument();
    expect(screen.queryByText('T2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Completadas' }));
    expect(screen.getByText('T2')).toBeInTheDocument();
    expect(screen.queryByText('T1')).not.toBeInTheDocument();
  });

  it('cambia el estado via el checkbox', () => {
    render(<TaskList />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_STATUS',
      payload: { id: '2', status: 'todo' }
    });
  });

  it('elimina una tarea con el botón', () => {
    render(<TaskList />);
    const deleteBtn = screen.getByTestId('delete-1');
    fireEvent.click(deleteBtn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'DELETE_TASK',
      payload: { id: '1' }
    });
  });
});
