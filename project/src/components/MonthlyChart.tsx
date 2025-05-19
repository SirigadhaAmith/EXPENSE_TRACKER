import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyAnalysis } from '../types';

interface Props {
  data: MonthlyAnalysis[];
}

const MonthlyChart: React.FC<Props> = ({ data }) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const formattedData = data.map(item => ({
    ...item,
    month: monthNames[parseInt(item.month.split('-')[1]) - 1],
    formattedAmount: Number(item.totalAmount.toFixed(2))
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false}
            stroke="rgba(148, 163, 184, 0.2)"
          />
          <XAxis 
            dataKey="month" 
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => [`$${value}`, 'Total']}
            labelStyle={{ color: '#1e293b', fontWeight: 500 }}
          />
          <Area 
            type="monotone"
            dataKey="formattedAmount"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorAmount)"
            animationDuration={1500}
            dot={{ 
              fill: '#3b82f6',
              stroke: 'white',
              strokeWidth: 2,
              r: 4
            }}
            activeDot={{
              fill: '#3b82f6',
              stroke: 'white',
              strokeWidth: 2,
              r: 6,
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;