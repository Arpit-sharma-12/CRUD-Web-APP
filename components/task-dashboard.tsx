"use client";

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { getAllTasks, createTask, updateTask, deleteTask } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import TaskList from '@/components/task-list';
import TaskForm from '@/components/task-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { useToast } from '@/hooks/use-toast';

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load tasks on component mount
    setTasks(getAllTasks());
  }, []);

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask = createTask(taskData);
    setTasks(getAllTasks());
    setIsFormOpen(false);
    toast({
      title: "Task created",
      description: "Your task has been created successfully.",
    });
  };

  const handleUpdateTask = (id: string, taskData: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    const updated = updateTask(id, taskData);
    if (updated) {
      setTasks(getAllTasks());
      setEditingTask(null);
      setIsFormOpen(false);
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    const deleted = deleteTask(id);
    if (deleted) {
      setTasks(getAllTasks());
      toast({
        title: "Task deleted",
        description: "Your task has been deleted successfully.",
        variant: "destructive",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <Button onClick={() => { setIsFormOpen(true); setEditingTask(null); }}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <TaskForm 
            onSubmit={editingTask ? 
              (data) => handleUpdateTask(editingTask.id, data) : 
              handleCreateTask
            }
            initialData={editingTask || undefined}
            onCancel={() => { setIsFormOpen(false); setEditingTask(null); }}
          />
        </div>
      )}

      <TaskList 
        tasks={tasks} 
        onEdit={handleEditTask} 
        onDelete={handleDeleteTask}
        onStatusChange={(id, status) => handleUpdateTask(id, { status })}
      />
    </div>
  );
}