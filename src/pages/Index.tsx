import { useExpenses } from '@/hooks/useExpenses';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseSummary } from '@/components/ExpenseSummary';
import { ExpenseChart } from '@/components/ExpenseChart';
import { Wallet, TrendingDown } from 'lucide-react';

const Index = () => {
  const { expenses, loading, addExpense, deleteExpense, getSummary } = useExpenses();
  const summary = getSummary();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">
              Expense Tracker
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your daily expenses, visualize spending patterns, and take control of your finances
          </p>
        </div>

        {/* Summary Cards */}
        <ExpenseSummary summary={summary} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="xl:col-span-1">
            <ExpenseForm onAddExpense={addExpense} />
          </div>

          {/* Right Column - Chart and List */}
          <div className="xl:col-span-2 space-y-8">
            <ExpenseChart summary={summary} />
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm">
              {expenses.length > 0 
                ? `Tracking ${expenses.length} expenses totaling $${summary.totalAll.toFixed(2)}`
                : 'Start adding expenses to see your spending insights'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
