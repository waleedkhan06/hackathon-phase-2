'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, CreateTaskFormData } from '@/lib/validations';
import { Task } from '@/types/api-types';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { AlertCircle, Plus, FileText, Type, Loader2, X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onCancel?: () => void;
  initialData?: Partial<Task>;
  userId: string;
  isLoading?: boolean;
}

export default function TaskForm({
  onSubmit,
  onCancel,
  initialData,
  userId,
  isLoading = false,
}: TaskFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
    },
  });

  const handleFormSubmit = async (data: CreateTaskFormData) => {
    setError(null);
    setSubmitting(true);

    try {
      if (!userId) {
        throw new Error('User not authenticated');
      }

      let response;
      if (initialData?.id) {
        response = await apiClient.updateTask(userId, initialData.id, {
          title: data.title,
          description: data.description || undefined,
          completed: initialData.completed ?? false,
        });
      } else {
        response = await apiClient.createTask(userId, {
          title: data.title,
          description: data.description || undefined,
          completed: false,
        });
      }

      onSubmit(response);
      reset();
      toast({
        title: initialData?.id ? 'Task Updated' : 'Task Created',
        description: initialData?.id ? 'Your task has been updated successfully.' : 'Your new task has been added.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save task. Please try again.';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <span className="flex-1">{error}</span>
        </motion.div>
      )}

      {/* Title Field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-2"
      >
        <Label
          htmlFor="title"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          <Type className="w-4 h-4 text-indigo-500" />
          Task Title
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="What needs to be done?"
          {...register('title')}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
            errors.title
              ? 'border-red-400 dark:border-red-500 focus:ring-red-400'
              : 'border-gray-200 dark:border-slate-600 focus:border-indigo-400 dark:focus:border-indigo-500'
          } dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-transparent`}
        />
        {errors.title && (
          <p className="text-red-500 dark:text-red-400 text-sm font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.title.message}
          </p>
        )}
      </motion.div>

      {/* Description Field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label
          htmlFor="description"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          <FileText className="w-4 h-4 text-indigo-500" />
          Description
          <span className="text-xs font-normal text-gray-400">(Optional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Add more details about your task..."
          rows={4}
          {...register('description')}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all duration-200 resize-none"
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-3 pt-2"
      >
        <Button
          type="submit"
          disabled={submitting || isLoading}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {initialData?.id ? 'Saving...' : 'Creating...'}
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              {initialData?.id ? 'Save Changes' : 'Create Task'}
            </>
          )}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-2 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-slate-700 bg-transparent flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        )}
      </motion.div>
    </form>
  );
}
