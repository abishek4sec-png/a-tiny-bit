import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { Expense, ExpenseCategory, ExpenseSummary } from '@/types/expense';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

type DatabaseExpense = Tables<'expenses'>;

export const useSupabaseExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

// Convert database expense to app expense format
const convertDbExpenseToExpense = (dbExpense: DatabaseExpense): Expense => ({
  id: dbExpense.id,
  amount: Number(dbExpense.amount),
  category: dbExpense.category as ExpenseCategory,
  description: dbExpense.description,
  date: dbExpense.date,
  createdAt: dbExpense.created_at,
});

  // Load expenses from Supabase
  const loadExpenses = useCallback(async () => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading expenses:', error);
        toast({
          title: "Error loading expenses",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      const convertedExpenses = data.map(convertDbExpenseToExpense);
      setExpenses(convertedExpenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
      toast({
        title: "Error loading expenses",
        description: "Failed to load your expenses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  // Add new expense
  const addExpense = useCallback(async (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add expenses",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert({
          user_id: user.id,
          amount: expenseData.amount,
          category: expenseData.category,
          description: expenseData.description,
          date: expenseData.date,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding expense:', error);
        toast({
          title: "Error adding expense",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      const newExpense = convertDbExpenseToExpense(data);
      setExpenses(prev => [newExpense, ...prev]);

      toast({
        title: "Expense added!",
        description: `Added $${expenseData.amount} for ${expenseData.category}`,
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error adding expense",
        description: "Failed to add your expense",
        variant: "destructive"
      });
    }
  }, [user]);

  // Delete expense
  const deleteExpense = useCallback(async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to delete expenses",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting expense:', error);
        toast({
          title: "Error deleting expense",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      setExpenses(prev => prev.filter(expense => expense.id !== id));

      toast({
        title: "Expense deleted",
        description: "The expense has been removed",
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error deleting expense",
        description: "Failed to delete the expense",
        variant: "destructive"
      });
    }
  }, [user]);

  // Calculate summary
  const getSummary = useCallback((): ExpenseSummary => {
    const now = new Date();
    const today = now.toDateString();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalToday = expenses
      .filter(expense => new Date(expense.date).toDateString() === today)
      .reduce((sum, expense) => sum + expense.amount, 0);

    const totalWeek = expenses
      .filter(expense => new Date(expense.date) >= weekStart)
      .reduce((sum, expense) => sum + expense.amount, 0);

    const totalMonth = expenses
      .filter(expense => new Date(expense.date) >= monthStart)
      .reduce((sum, expense) => sum + expense.amount, 0);

    const totalAll = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categorySummary = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

    return {
      totalToday,
      totalWeek,
      totalMonth,
      totalAll,
      categorySummary
    };
  }, [expenses]);

  return {
    expenses,
    loading,
    addExpense,
    deleteExpense,
    getSummary
  };
};