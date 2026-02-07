'use client';

import { useState } from 'react';
import { Task } from '@/types/api-types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import TaskForm from './task-form';
import { motion } from 'framer-motion';
import { PencilIcon, Trash2, Calendar, CheckCircle2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export default function TaskCard({
  task,
  onToggleComplete,
  onUpdate,
  onDelete,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveEdit = async (updatedTask: Task) => {
    try {
      onUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <motion.div
      layout
      className={`group relative bg-white dark:bg-slate-800/80 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        task.completed
          ? 'border-emerald-200 dark:border-emerald-800/40'
          : 'border-gray-100 dark:border-slate-700/60 hover:border-indigo-200 dark:hover:border-indigo-700/50'
      } ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} overflow-hidden`}
    >
      {/* Top accent line */}
      <div
        className={`h-1 w-full transition-colors duration-300 ${
          task.completed
            ? 'bg-gradient-to-r from-emerald-400 to-green-400'
            : 'bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-100'
        }`}
      />

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="pt-0.5">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task)}
              className="h-5 w-5 rounded-md border-2 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 data-[state=checked]:text-white transition-all"
            />
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="pb-2">
                <TaskForm
                  initialData={{
                    id: task.id,
                    title: task.title,
                    description: task.description || '',
                    completed: task.completed,
                  }}
                  onSubmit={handleSaveEdit}
                  onCancel={() => setIsEditing(false)}
                  userId={task.user_id}
                />
              </div>
            ) : (
              <>
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-lg font-semibold cursor-pointer break-words block transition-all duration-200 ${
                    task.completed
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {task.title}
                </label>

                {task.description && (
                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center gap-3 mt-4">
                  {task.completed && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(task.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
