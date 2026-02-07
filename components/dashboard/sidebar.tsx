'use client';

import { Task } from '@/types/api-types';
import { CheckCircle2, Circle, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Chatbot from '@/components/ai/chatbot';

interface SidebarProps {
  tasks: Task[];
  userId: string;
  completionRate: number;
  isCollapsed?: boolean;
}

export default function Sidebar({
  tasks,
  userId,
  completionRate,
  isCollapsed = false,
}: SidebarProps) {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;

  // Get recent tasks (last 3)
  const recentTasks = tasks.slice(0, 3);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        isCollapsed ? 'w-20' : 'w-80'
      } flex flex-col gap-6 overflow-hidden transition-all duration-300`}
    >
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-indigo-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">
              Progress Today
            </span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-bold text-white">{completionRate}%</span>
            <span className="text-xs text-slate-400">Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="px-3 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
            <p className="text-xs text-slate-400 mb-1">Total</p>
            <p className="text-lg font-bold text-white">{totalTasks}</p>
          </div>
          <div className="px-3 py-3 rounded-lg bg-emerald-900/20 border border-emerald-700/30 text-center">
            <p className="text-xs text-emerald-400 mb-1">Done</p>
            <p className="text-lg font-bold text-emerald-400">{completedTasks}</p>
          </div>
          <div className="px-3 py-3 rounded-lg bg-amber-900/20 border border-amber-700/30 text-center">
            <p className="text-xs text-amber-400 mb-1">Pending</p>
            <p className="text-lg font-bold text-amber-400">{pendingTasks}</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between px-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            Recent Tasks
          </h3>
          {recentTasks.length > 0 && (
            <span className="text-xs bg-indigo-600/30 text-indigo-300 px-2 py-1 rounded-full">
              {recentTasks.length}
            </span>
          )}
        </div>

        <div className="space-y-2">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-3 py-2 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <button className="mt-0.5 flex-shrink-0 text-slate-500 group-hover:text-indigo-400 transition-colors">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium truncate ${
                        task.completed
                          ? 'text-slate-500 line-through'
                          : 'text-slate-200'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="px-3 py-4 text-center">
              <p className="text-xs text-slate-500">No tasks yet</p>
              <Link
                href="/tasks"
                className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 inline-block"
              >
                Create one →
              </Link>
            </div>
          )}
        </div>
      </motion.div>

      {/* AI Chatbot */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1 flex flex-col min-h-0"
      >
        <Chatbot userId={userId} />
      </motion.div>
    </motion.aside>
  );
}
