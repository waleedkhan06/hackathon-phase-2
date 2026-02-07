'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // Use replace to prevent back navigation to protected content
      router.replace('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect to home even if signOut fails
      router.replace('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            PrimeTask
          </Link>
          
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link 
                href="/tasks" 
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Tasks
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated && (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}