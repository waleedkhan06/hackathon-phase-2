'use client';

import { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Set theme preference in user profile when changed
  useEffect(() => {
    setIsMounted(true);
    
    const updateThemePreference = async () => {
      // In a real app, you would update the user's theme preference in the backend
      // For now, we'll just store it locally
      if (theme) {
        localStorage.setItem('theme-preference', theme);
      }
    };

    updateThemePreference();
  }, [theme]);

  const currentTheme = resolvedTheme || theme || 'system';
  
  // Safely check media query only on client
  const isDark = isMounted 
    ? currentTheme === 'dark' || (currentTheme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    : false;
    
  const isLight = isMounted
    ? currentTheme === 'light' || (currentTheme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches)
    : false;

  return {
    theme: currentTheme,
    setTheme,
    isDark,
    isLight,
  };
}
