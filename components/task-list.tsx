"use client";

import { Task } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: 'todo' | 'in-progress' | 'completed') => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'todo':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const renderTaskCard = (task: Task) => (
    <Card key={task.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{task.title}</CardTitle>
            <CardDescription className="mt-1">
              Created on {formatDate(task.createdAt)}
            </CardDescription>
          </div>
          <Badge className={cn("ml-2", getPriorityColor(task.priority))}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{task.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center">
          <Select 
            value={task.status} 
            onValueChange={(value) => onStatusChange(task.id, value as 'todo' | 'in-progress' | 'completed')}
          >
            <SelectTrigger className="w-[140px]">
              <div className="flex items-center">
                {getStatusIcon(task.status)}
                <span className="ml-2">
                  {task.status === 'todo' ? 'To Do' : 
                   task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
                  To Do
                </div>
              </SelectItem>
              <SelectItem value="in-progress">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  In Progress
                </div>
              </SelectItem>
              <SelectItem value="completed">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Completed
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(task)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
        <TabsTrigger value="todo">To Do ({todoTasks.length})</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress ({inProgressTasks.length})</TabsTrigger>
        <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        {tasks.length > 0 ? (
          tasks.map(renderTaskCard)
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tasks found. Create a new task to get started.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="todo">
        {todoTasks.length > 0 ? (
          todoTasks.map(renderTaskCard)
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No to-do tasks found.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="in-progress">
        {inProgressTasks.length > 0 ? (
          inProgressTasks.map(renderTaskCard)
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No in-progress tasks found.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed">
        {completedTasks.length > 0 ? (
          completedTasks.map(renderTaskCard)
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No completed tasks found.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}