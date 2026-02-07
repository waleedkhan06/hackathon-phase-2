'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'destructive';
}

export function DropdownMenu({ trigger, children, align = 'right' }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-black/30 border border-gray-200 dark:border-slate-700 py-1 min-w-max ${
              align === 'left' ? 'left-0' : 'right-0'
            }`}
          >
            <div onClick={() => setIsOpen(false)}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownMenuTrigger({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DropdownMenuItem({ children, onClick, className = '', variant = 'default' }: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
        variant === 'destructive'
          ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700/50'
      } ${className}`}
    >
      {children}
    </button>
  );
}
