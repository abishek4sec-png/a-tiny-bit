export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string; // ISO date string
  createdAt: string; // ISO date string
}

export type ExpenseCategory = 
  | 'food'
  | 'travel'
  | 'shopping'
  | 'utilities'
  | 'entertainment'
  | 'health'
  | 'other';

export const EXPENSE_CATEGORIES: { 
  value: ExpenseCategory; 
  label: string; 
  color: string;
  icon: string;
}[] = [
  { value: 'food', label: 'Food & Dining', color: 'category-food', icon: '🍽️' },
  { value: 'travel', label: 'Travel', color: 'category-travel', icon: '✈️' },
  { value: 'shopping', label: 'Shopping', color: 'category-shopping', icon: '🛍️' },
  { value: 'utilities', label: 'Utilities', color: 'category-utilities', icon: '⚡' },
  { value: 'entertainment', label: 'Entertainment', color: 'category-entertainment', icon: '🎬' },
  { value: 'health', label: 'Health & Fitness', color: 'category-health', icon: '💊' },
  { value: 'other', label: 'Other', color: 'category-other', icon: '📦' }
];

export interface ExpenseSummary {
  totalToday: number;
  totalWeek: number;
  totalMonth: number;
  totalAll: number;
  categorySummary: Record<ExpenseCategory, number>;
}