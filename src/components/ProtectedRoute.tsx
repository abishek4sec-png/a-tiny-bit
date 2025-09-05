import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Wallet } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-primary/5">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary via-primary-glow to-accent shadow-lg animate-pulse">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-black gradient-text">
              Expense Tracker
            </h1>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be handled by the main App component
  }

  return <>{children}</>;
};