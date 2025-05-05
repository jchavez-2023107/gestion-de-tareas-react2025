import React from 'react';
import { render, screen } from '@testing-library/react';
import CalendarView from '../components/CalendarView';
import { useTasks } from '../context/TaskContext';
import '@testing-library/jest-dom';

jest.mock('../context/TaskContext', () => ({
  useTasks: jest.fn(),
}));

describe('CalendarView', () => {
  beforeEach(() => {
    useTasks.mockReturnValue({
      tasks: [
        { id: '1', title: 'SoloHoy', description: '', status: 'todo', startDate: '2025-05-05', endDate: '2025-05-05' },
        { id: '2', title: 'Rango',   description: '', status: 'todo', startDate: '2025-05-01', endDate: '2025-05-10' },
      ]
    });
  });

  it('muestra el encabezado', () => {
    render(<CalendarView />);
    expect(screen.getByText(/Calendario de Tareas/i)).toBeInTheDocument();
  });
});
