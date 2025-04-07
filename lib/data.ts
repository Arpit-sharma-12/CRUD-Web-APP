import { Task } from './types';

// Initial tasks data
let tasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and finalize the project proposal document',
    status: 'todo',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests and provide feedback',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update the project documentation with recent changes',
    status: 'completed',
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
];

// CRUD operations
export const getAllTasks = (): Task[] => {
  return [...tasks];
};

export const getTaskById = (id: string): Task | undefined => {
  return tasks.find(task => task.id === id);
};

export const createTask = (task: Omit<Task, 'id' | 'createdAt'>): Task => {
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  tasks = [...tasks, newTask];
  return newTask;
};

export const updateTask = (id: string, updatedTask: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return null;
  }
  
  const updatedTaskData = {
    ...tasks[taskIndex],
    ...updatedTask,
  };
  
  tasks = [
    ...tasks.slice(0, taskIndex),
    updatedTaskData,
    ...tasks.slice(taskIndex + 1),
  ];
  
  return updatedTaskData;
};

export const deleteTask = (id: string): boolean => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  return tasks.length !== initialLength;
};