import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus, DollarSign } from 'lucide-react';
import { ExpenseCategory, EXPENSE_CATEGORIES } from '@/types/expense';

interface ExpenseFormProps {
  onAddExpense: (expense: {
    amount: number;
    category: ExpenseCategory;
    description: string;
    date: string;
  }) => void;
}

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onAddExpense({
        amount: parseFloat(amount),
        category,
        description: description.trim(),
        date: date + 'T00:00:00.000Z',
      });

      // Reset form
      setAmount('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="expense-card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
          <Plus className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Add New Expense</h2>
          <p className="text-sm text-muted-foreground">💸 What did you buy today?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">💵 Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 h-11 border-2 hover:border-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">📅 Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 border-2 hover:border-primary/50 focus:border-primary transition-colors"
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="category" className="text-sm font-medium">🏷️ Category</Label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {EXPENSE_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  category === cat.value 
                    ? 'border-primary bg-primary/10 shadow-md' 
                    : 'border-border hover:border-primary/50 bg-background'
                }`}
              >
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="text-xs font-medium">{cat.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">📝 Description</Label>
          <Textarea
            id="description"
            placeholder="What did you spend on? (e.g., Coffee at Starbucks)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[70px] border-2 hover:border-primary/50 focus:border-primary transition-colors"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200" 
          disabled={isSubmitting || !amount || !description.trim()}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Adding...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Expense
            </div>
          )}
        </Button>
      </form>
    </Card>
  );
};