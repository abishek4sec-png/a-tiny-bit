import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { ExpenseSummary, EXPENSE_CATEGORIES } from '@/types/expense';

interface ExpenseChartProps {
  summary: ExpenseSummary;
}

export const ExpenseChart = ({ summary }: ExpenseChartProps) => {
  // Prepare data for the pie chart
  const chartData = EXPENSE_CATEGORIES
    .map(category => ({
      name: category.label,
      value: summary.categorySummary[category.value] || 0,
      icon: category.icon,
      color: getComputedStyle(document.documentElement)
        .getPropertyValue(`--${category.color}`)
        .trim() || '#8884d8'
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  if (chartData.length === 0) {
    return (
      <Card className="expense-card p-8 text-center">
        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No data to show</h3>
        <p className="text-muted-foreground">Start adding expenses to see your spending breakdown!</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.payload.name}</p>
          <p className="text-primary font-semibold">
            ${data.value.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            {((data.value / summary.totalAll) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: `hsl(${entry.color})` }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="expense-card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-success to-success/80">
            <BarChart3 className="h-6 w-6 text-success-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Spending by Category</h2>
            <p className="text-sm text-muted-foreground">📊 Your money breakdown</p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">${summary.totalAll.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={130}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(${entry.color})`}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown */}
      <div className="mt-6 space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Category Breakdown</h3>
        {chartData.map((category, index) => {
          const percentage = (category.value / summary.totalAll) * 100;
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: `hsl(${category.color})` }}
                />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">${category.value.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};