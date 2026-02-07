'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/lib/api';
import { Task } from '@/types/api-types';
import { Button } from '@/components/ui/button';
import TaskCard from '@/components/task/task-card';
import TaskForm from '@/components/task/task-form';
import AuthGuard from '@/components/auth/auth-guard';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Plus,
  LogOut,
  Sparkles,
  ArrowRight,
  Target,
  Rocket,
  BarChart3,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TasksPage() {
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.id) {
        fetchTasks();
      } else {
        const pollForUser = async () => {
          let attempts = 0;
          const maxAttempts = 25;
          while (attempts < maxAttempts) {
            if (userRef.current?.id) {
              fetchTasks();
              return;
            }
            await new Promise(resolve => setTimeout(resolve, 200));
            attempts++;
          }
          if (isAuthenticated && userRef.current?.id) {
            fetchTasks();
          }
        };
        pollForUser();
      }
    }
  }, [isAuthenticated, user?.id]); // Only include dependencies that affect the logic

  const fetchTasks = async () => {
    if (!isAuthenticated || !user?.id) return;
    try {
      setLoading(true);
      const response = await apiClient.getTasks(user.id);
      setTasks(response);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
    toast({
      title: 'Task Created',
      description: 'Your new task has been added successfully.',
    });
  };

  const handleTaskUpdated = async (updatedTask: Task) => {
    if (!isAuthenticated || !user?.id) return;
    try {
      const response = await apiClient.updateTask(user.id, updatedTask.id, {
        title: updatedTask.title,
        description: updatedTask.description || undefined,
        completed: updatedTask.completed,
      });
      setTasks(prev => prev.map(task => (task.id === updatedTask.id ? response : task)));
      toast({
        title: 'Task Updated',
        description: 'Changes saved successfully.',
      });
    } catch (error) {
      console.error('Failed to update task in backend:', error);
      toast({ title: 'Update Failed', description: 'Could not save changes. Please try again.', variant: 'destructive' });
    }
  };

  const handleTaskDeleted = async (taskId: number) => {
    if (!isAuthenticated || !user?.id) return;
    try {
      await apiClient.deleteTask(user.id, taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast({ title: 'Task Deleted', description: 'The task has been removed.' });
    } catch (error) {
      console.error('Failed to delete task in backend:', error);
      toast({ title: 'Delete Failed', description: 'Could not remove the task. Please try again.', variant: 'destructive' });
    }
  };

  const handleToggleComplete = async (task: Task) => {
    if (!isAuthenticated || !user?.id) return;
    try {
      const response = await apiClient.toggleTaskCompletion(user.id, task.id);
      if (response) {
        setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, completed: !t.completed } : t)));
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  const userName = user?.name || 'there';
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <AuthGuard requireAuth={true} redirectTo="/sign-in">
      <div className="min-h-full">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Hero */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-10"
          >
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1 tracking-wide uppercase">
              {getGreeting()}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-balance">
              Welcome back, {userName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base max-w-lg">
              {totalTasks === 0
                ? 'Your workspace is ready. Create your first task to get started.'
                : `You have ${totalTasks - completedTasks} task${totalTasks - completedTasks !== 1 ? 's' : ''} to focus on today.`}
            </p>
          </motion.div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Create Task Card */}
            <motion.button
              onClick={() => setShowForm(true)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl p-6 text-left bg-gradient-to-br from-indigo-600 to-blue-600 dark:from-indigo-700 dark:to-blue-700 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Create Task</h3>
                <p className="text-sm text-indigo-100">Add a new task to your list</p>
              </div>
              <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-white/50 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-200" />
            </motion.button>

            {/* View Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/stats"
                className="group relative flex flex-col overflow-hidden rounded-2xl p-6 h-full bg-white dark:bg-slate-900/80 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">View Stats</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track your productivity</p>
                <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </motion.div>

            {/* Quick Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-slate-900/80 border border-gray-200/60 dark:border-slate-800/60 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                <Rocket className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Progress</h3>
              {totalTasks > 0 ? (
                <div className="mt-2">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {completedTasks}
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-500">/ {totalTasks} done</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%` }}
                      transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No tasks yet</p>
              )}
            </motion.div>
          </div>

          {/* Motivational Banner */}
          {totalTasks > 0 && completedTasks === totalTasks && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200/60 dark:border-emerald-800/40 p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-200">All tasks complete!</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Outstanding work. You have finished everything on your list.</p>
              </div>
            </motion.div>
          )}

          {/* Task Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 bg-white dark:bg-slate-900/80 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 p-8 border border-gray-200/60 dark:border-slate-800/60"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create New Task
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <TaskForm
                onSubmit={handleTaskCreated}
                onCancel={() => setShowForm(false)}
                userId={user?.id || ''}
              />
            </motion.div>
          )}

          {/* Tasks Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Tasks</h2>
              {tasks.length > 0 && (
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-900/80 rounded-xl p-6 animate-pulse border border-gray-200/60 dark:border-slate-800/60"
                  >
                    <div className="h-5 bg-gray-100 dark:bg-slate-800 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : tasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <TaskCard
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onUpdate={handleTaskUpdated}
                      onDelete={handleTaskDeleted}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16"
              >
                <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-12 max-w-sm mx-auto border border-gray-200/60 dark:border-slate-800/60 shadow-sm">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center">
                    <Target className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No tasks yet
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Create your first task and start building momentum.
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white flex items-center justify-center gap-2 w-full rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                    Create First Task
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
