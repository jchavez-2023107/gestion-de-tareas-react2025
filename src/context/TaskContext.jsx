import { createContext, useContext, useReducer, useEffect } from 'react';

const TaskContext = createContext();

const local = JSON.parse(localStorage.getItem('tasksState'));
const today = new Date().toISOString().substring(0, 10);

const initialState = local || {
  tasks: [],
  deleted: []
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now().toString(),
            title: action.payload.title.trim(),
            description: action.payload.description.trim(),
            status: 'todo',
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
            createdAt: new Date().toISOString(),
          }
        ]
      };

    case 'CHANGE_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status }
            : t
        )
      };

    case 'DELETE_TASK': {
      const toDelete = state.tasks.find(t => t.id === action.payload.id);
      return {
        tasks: state.tasks.filter(t => t.id !== action.payload.id),
        deleted: [...state.deleted, toDelete]
      };
    }

    case 'RESTORE_TASK': {
      const toRestore = state.deleted.find(t => t.id === action.payload.id);
      return {
        tasks: [...state.tasks, toRestore],
        deleted: state.deleted.filter(t => t.id !== action.payload.id)
      };
    }

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? {
                ...t,
                title: action.payload.title.trim(),
                description: action.payload.description.trim(),
                status: action.payload.status,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
              }
            : t
        )
      };

    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    localStorage.setItem('tasksState', JSON.stringify(state));
  }, [state]);

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks debe usarse dentro de TaskProvider');
  return context;
}
