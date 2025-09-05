import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, User, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LoginFormProps {
  onToggleMode: () => void;
  isSignUp: boolean;
}

export const LoginForm = ({ onToggleMode, isSignUp }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = isSignUp 
        ? await signUp(username.trim(), password)
        : await signIn(username.trim(), password);

      if (!error) {
        // Reset form on success
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-primary/5 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary via-primary-glow to-accent shadow-lg">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-black gradient-text">
              Expense Tracker
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isSignUp ? 'Create your account to start tracking expenses' : 'Welcome back! Sign in to continue'}
          </p>
        </div>

        {/* Login Card */}
        <Card className="expense-card shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                {isSignUp ? (
                  <UserPlus className="h-5 w-5 text-primary" />
                ) : (
                  <User className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              {isSignUp 
                ? 'Choose a username and password to get started'
                : 'Enter your credentials to access your dashboard'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 border-2 hover:border-primary/50 focus:border-primary transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 hover:border-primary/50 focus:border-primary transition-colors"
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                disabled={isSubmitting || !username.trim() || !password.trim()}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isSignUp ? <UserPlus className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={onToggleMode}
                className="text-primary hover:text-primary-glow font-medium transition-colors"
                disabled={isSubmitting}
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Create one"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Secure • Simple • Beautiful</p>
        </div>
      </div>
    </div>
  );
};