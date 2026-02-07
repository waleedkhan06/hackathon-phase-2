'use client';

import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/dashboard/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/lib/api';
import { Task } from '@/types/api-types';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchTasks();
    }
  }, [isAuthenticated, user?.id]);

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

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          {children}
        </main>

        {/* Sidebar */}
        {isAuthenticated && user?.id && (
          <div className="w-80 border-l border-slate-700/50 bg-gradient-to-b from-slate-900/80 to-slate-950/80 overflow-y-auto hidden lg:flex flex-col p-6 gap-6">
            <Sidebar
              tasks={tasks}
              userId={user.id}
              completionRate={completionRate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
