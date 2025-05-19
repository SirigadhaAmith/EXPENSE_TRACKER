export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export interface MonthlyAnalysis {
  month: string;
  totalAmount: number;
  categories: {
    [key: string]: number;
  };
}

export interface SpendingAlert {
  type: 'warning' | 'danger';
  message: string;
  category?: string;
}