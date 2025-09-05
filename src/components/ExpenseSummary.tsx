import { Card } from '@/components/ui/card';
import { TrendingUp, Calendar, Clock, Wallet } from 'lucide-react';
import { ExpenseSummary as ExpenseSummaryType } from '@/types/expense';

interface ExpenseSummaryProps {
  summary: ExpenseSummaryType;
}

export const ExpenseSummary = ({ summary }: ExpenseSummaryProps) => {
  const summaryCards = [
    {
      title: 'Today',
      amount: summary.totalToday,
      icon: Clock,
      description: 'Spent today',
      color: 'text-primary'
    },
    {
      title: 'This Week',
      amount: summary.totalWeek,
      icon: Calendar,
      description: 'Spent this week',
      color: 'text-accent'
    },
    {
      title: 'This Month',
      amount: summary.totalMonth,
      icon: TrendingUp,
      description: 'Spent this month',
      color: 'text-warning'
    },
    {
      title: 'Total',
      amount: summary.totalAll,
      icon: Wallet,
      description: 'Total spending',
      color: 'text-success'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards.map((card) => {
        const IconComponent = card.icon;
        
        return (
          <Card key={card.title} className="stats-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="text-2xl font-bold">
                  ${card.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5`}>
                <IconComponent className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};