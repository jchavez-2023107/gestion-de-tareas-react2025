import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditTaskModal from '../components/EditTaskModal';
import '@testing-library/jest-dom';

describe('EditTaskModal', () => {
  const task = {
    id: '1',
    title: 'Original',
    description: 'Desc',
    status: 'todo',
    startDate: '2025-05-01',
    endDate: '2025-05-02'
  };
  let dispatch, onClose;

  beforeEach(() => {
    dispatch = jest.fn();
    onClose = jest.fn();
    render(
      <EditTaskModal
        isOpen={true}
        onClose={onClose}
        task={task}
        dispatch={dispatch}
      />
    );
  });

  it('muestra valores iniciales y actualiza tarea', () => {
    const titleInput = screen.getByDisplayValue('Original');
    const descInput = screen.getByDisplayValue('Desc');
    const startInput = screen.getByDisplayValue('2025-05-01');
    const endInput = screen.getByDisplayValue('2025-05-02');
    const statusSelect = screen.getByDisplayValue('Por hacer');
    const saveBtn = screen.getByRole('button', { name: /Guardar/i });

    expect(titleInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(startInput).toBeInTheDocument();
    expect(endInput).toBeInTheDocument();
    expect(statusSelect).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: 'Modificado' } });
    fireEvent.change(statusSelect, { target: { value: 'completed' } });
    fireEvent.click(saveBtn);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TASK',
      payload: expect.objectContaining({
        id: '1',
        title: 'Modificado',
        status: 'completed'
      })
    });
    expect(onClose).toHaveBeenCalled();
  });
});
