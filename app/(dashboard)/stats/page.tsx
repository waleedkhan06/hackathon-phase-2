'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/lib/api';
import { Task } from '@/types/api-types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  CalendarDays,
  PieChart,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/auth/auth-guard';

export default function StatsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user?.id]); // Only depend on user.id to avoid infinite re-renders

  const fetchTasks = async () => {
    if (!user?.id) return;

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

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate weekly stats
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of current week (Sunday)
  
  const tasksThisWeek = tasks.filter(task => {
    const taskDate = new Date(task.created_at);
    return taskDate >= weekStart;
  });

  const completedThisWeek = tasksThisWeek.filter(t => t.completed).length;
  const pendingThisWeek = tasksThisWeek.filter(t => !t.completed).length;

  return (
    <AuthGuard requireAuth={true} redirectTo="/sign-in">
      <div className="min-h-full">
        <main className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Productivity Stats
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your task completion and productivity trends
              </p>
            </div>

            <Button
              onClick={() => router.push('/tasks')}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              <Calendar className="w-5 h-5" />
              View Tasks
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {/* Total Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalTasks}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </motion.div>

            {/* Completed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{completedTasks}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </motion.div>

            {/* Pending */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">{pendingTasks}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </motion.div>

            {/* Completion Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Completion</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{completionRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Weekly Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {/* This Week Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">This Week</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Tasks Created</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{tasksThisWeek.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Completed</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">{completedThisWeek}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Pending</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">{pendingThisWeek}</span>
                </div>
                
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Weekly Completion</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tasksThisWeek.length > 0 ? Math.round((completedThisWeek / tasksThisWeek.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${tasksThisWeek.length > 0 ? (completedThisWeek / tasksThisWeek.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Completion Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Task Distribution</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{completedTasks}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Pending</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{pendingTasks}</span>
                </div>
                
                <div className="pt-4">
                  <div className="relative w-full h-48 flex items-center justify-center">
                    <div className="relative w-40 h-40 rounded-full flex items-center justify-center">
                      {/* Circular chart visualization */}
                      <svg className="w-40 h-40" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-gray-200 dark:text-slate-700"
                        />
                        
                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283" // Circumference: 2 * π * r (45) ≈ 283
                          strokeDashoffset={283 - (283 * completionRate) / 100}
                          className="text-green-500 origin-center -rotate-90 transition-all duration-1000"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{completionRate}%</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Recent Activity */}
          {tasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              </div>
              
              <div className="space-y-4">
                {tasks.slice(0, 5).map((task, index) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${task.completed ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <span className="font-medium text-gray-900 dark:text-white truncate max-w-xs">{task.title}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(task.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {tasks.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-gray-100 dark:border-slate-700">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Tasks Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Complete some tasks to see your productivity statistics here.
                </p>
                <Button
                  onClick={() => router.push('/tasks')}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white flex items-center justify-center gap-2 w-full"
                >
                  <Calendar className="w-5 h-5" />
                  Create Your First Task
                </Button>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
