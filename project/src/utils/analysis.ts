import { Expense, MonthlyAnalysis, SpendingAlert } from '../types';

export const analyzeMonthlySpending = (expenses: Expense[]): MonthlyAnalysis[] => {
  const monthlyData: { [key: string]: MonthlyAnalysis } = {};

  expenses.forEach(expense => {
    const month = expense.date.substring(0, 7); // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        totalAmount: 0,
        categories: {}
      };
    }
    
    monthlyData[month].totalAmount += expense.amount;
    monthlyData[month].categories[expense.category] = 
      (monthlyData[month].categories[expense.category] || 0) + expense.amount;
  });

  return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
};

export const generateSpendingAlerts = (
  currentMonth: MonthlyAnalysis,
  previousMonths: MonthlyAnalysis[]
): SpendingAlert[] => {
  const alerts: SpendingAlert[] = [];
  
  if (previousMonths.length === 0) return alerts;

  // Calculate average monthly spending
  const avgMonthlySpending = previousMonths.reduce(
    (sum, month) => sum + month.totalAmount, 
    0
  ) / previousMonths.length;

  // Alert if current month spending is 50% higher than average
  if (currentMonth.totalAmount > avgMonthlySpending * 1.5) {
    alerts.push({
      type: 'danger',
      message: `Your spending this month is ${Math.round((currentMonth.totalAmount/avgMonthlySpending - 1) * 100)}% higher than your monthly average!`
    });
  }

  // Check category-specific spikes
  Object.entries(currentMonth.categories).forEach(([category, amount]) => {
    const avgCategorySpending = previousMonths.reduce((sum, month) => 
      sum + (month.categories[category] || 0), 0
    ) / previousMonths.length;

    if (amount > avgCategorySpending * 2) {
      alerts.push({
        type: 'warning',
        message: `Unusually high spending in ${category}`,
        category
      });
    }
  });

  return alerts;
};