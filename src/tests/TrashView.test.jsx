import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TrashView from '../components/TrashView';
import { useTasks } from '../context/TaskContext';
import '@testing-library/jest-dom';

jest.mock('../context/TaskContext', () => ({
  useTasks: jest.fn(),
}));

describe('TrashView', () => {
  let dispatch;
  const deleted = [
    { id: '1', title: 'Old', description: 'X' }
  ];

  beforeEach(() => {
    dispatch = jest.fn();
    useTasks.mockReturnValue({ deleted, dispatch });
  });

  it('muestra tareas eliminadas y restaura al click', () => {
    render(<TrashView />);
    expect(screen.getByText('Old')).toBeInTheDocument();
    const restoreBtn = screen.getByText(/Restaurar/i);
    fireEvent.click(restoreBtn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RESTORE_TASK',
      payload: { id: '1' }
    });
  });
});
