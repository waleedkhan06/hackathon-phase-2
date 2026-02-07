'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isAuthenticated: boolean;
  onLogout?: () => void;
}

export function MobileMenu({ isAuthenticated, onLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Menu */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 p-4 space-y-2 z-50"
            >
              {isAuthenticated ? (
                <>
                  <Link
                    href="/tasks"
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Tasks
                  </Link>
                  <Link
                    href="/stats"
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Stats
                  </Link>
                  <hr className="my-2 border-gray-200 dark:border-slate-700" />
                  <button
                    onClick={() => {
                      onLogout?.();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
