import { useState, useEffect, useCallback } from 'react';
import { Expense, ExpenseCategory, ExpenseSummary } from '@/types/expense';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'lovable-expenses';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Load expenses from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedExpenses = JSON.parse(stored);
        setExpenses(parsedExpenses);
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
      toast({
        title: "Error loading expenses",
        description: "Failed to load your saved expenses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Save expenses to localStorage
  const saveExpenses = useCallback((newExpenses: Expense[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
      toast({
        title: "Error saving expenses",
        description: "Failed to save your expenses",
        variant: "destructive"
      });
    }
  }, []);

  // Add new expense
  const addExpense = useCallback((expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);

    toast({
      title: "Expense added!",
      description: `Added $${expenseData.amount} for ${expenseData.category}`,
    });
  }, [expenses, saveExpenses]);

  // Delete expense
  const deleteExpense = useCallback((id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);

    toast({
      title: "Expense deleted",
      description: "The expense has been removed",
    });
  }, [expenses, saveExpenses]);

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