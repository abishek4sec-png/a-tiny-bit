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
      description: '💸 Spent today',
      color: 'text-stat-today',
      bgColor: 'bg-stat-today/10',
      borderColor: 'border-stat-today/20',
      trend: '+12%'
    },
    {
      title: 'This Week',
      amount: summary.totalWeek,
      icon: Calendar,
      description: '📊 Spent this week',
      color: 'text-stat-week',
      bgColor: 'bg-stat-week/10',
      borderColor: 'border-stat-week/20',
      trend: '+8%'
    },
    {
      title: 'This Month',
      amount: summary.totalMonth,
      icon: TrendingUp,
      description: '📈 Spent this month',
      color: 'text-stat-month',
      bgColor: 'bg-stat-month/10',
      borderColor: 'border-stat-month/20',
      trend: '+15%'
    },
    {
      title: 'Total',
      amount: summary.totalAll,
      icon: Wallet,
      description: '💰 Total spending',
      color: 'text-stat-total',
      bgColor: 'bg-stat-total/10',
      borderColor: 'border-stat-total/20',
      trend: ''
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards.map((card) => {
        const IconComponent = card.icon;
        
        return (
          <Card key={card.title} className={`stats-card p-6 ${card.borderColor} border-2 hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {card.title}
                  </p>
                  {card.trend && (
                    <span className={`text-xs px-2 py-1 rounded-full ${card.bgColor} ${card.color} font-medium`}>
                      {card.trend}
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold mb-1">
                  ${card.amount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${card.bgColor} transition-all duration-300 hover:scale-110`}>
                <IconComponent className={`h-7 w-7 ${card.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};