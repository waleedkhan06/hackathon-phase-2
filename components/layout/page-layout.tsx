'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import Footer from './footer';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Responsive Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-gradient-to-r from-slate-900/95 to-slate-900/95 backdrop-blur">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent flex-shrink-0"
            >
              PrimeTask
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-gray-400">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
