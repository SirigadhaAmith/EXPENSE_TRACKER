import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B6B6B', '#E9D985', '#556270', '#6C5B7B'
];

const AnalyticsDashboard: React.FC<Props> = ({ expenses }) => {
  // Category breakdown
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Category Distribution */}
      <div className="card-container rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Spending Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {pieData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-600">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Insights */}
      <div className="card-container rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Insights</h3>
        <div className="space-y-4">
          {Object.entries(categoryData)
            .sort(([, a], [, b]) => b - a)
            .map(([category, amount], index) => (
              <div key={category} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm text-gray-600">${amount.toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(amount / Math.max(...Object.values(categoryData))) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;