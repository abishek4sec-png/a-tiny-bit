import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { ExpenseSummary } from './ExpenseSummary';
import { ExpenseChart } from './ExpenseChart';
import { Header } from './Header';
import { useExpenses } from '@/hooks/useExpenses';
import { Toaster } from '@/components/ui/sonner';

interface DashboardProps {
  user: { username: string };
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const { expenses, loading, addExpense, deleteExpense, getSummary } = useExpenses();
  const summary = getSummary();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <ExpenseSummary summary={summary} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Add Expense Form */}
          <div className="space-y-8">
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseChart summary={summary} />
          </div>
          
          {/* Right Column - Expense List */}
          <div className="space-y-8">
            <ExpenseList 
              expenses={expenses} 
              onDeleteExpense={deleteExpense} 
            />
          </div>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}