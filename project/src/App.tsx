import React, { useState } from 'react';
import { Expense } from './types';
import { 
  PlusCircle, Edit2, Trash2, DollarSign, Calendar, Tag, PieChart,
  TrendingUp, CreditCard, Wallet, ArrowUpCircle, ArrowDownCircle,
  LogIn, LogOut, User, Mail, Lock
} from 'lucide-react';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import MonthlyChart from './components/MonthlyChart';
import { analyzeMonthlySpending } from './utils/analysis';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const categories = [
    'Food', 'Transport', 'Entertainment', 'Shopping', 'Healthcare', 
    'Education', 'Travel', 'Utilities', 'Housing', 'Investment',
    'Groceries', 'Technology', 'Fitness', 'Beauty', 'Gifts'
  ];

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simple validation
    if (email && password) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Please enter both email and password');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const expense: Expense = {
      id: editingExpense?.id || Date.now(),
      name: formData.get('name') as string,
      amount: parseFloat(formData.get('amount') as string),
      category: formData.get('category') as string,
      date: formData.get('date') as string,
    };

    if (editingExpense) {
      setExpenses(expenses.map(exp => exp.id === editingExpense.id ? expense : exp));
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, expense]);
    }

    (e.target as HTMLFormElement).reset();
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const filteredExpenses = filterCategory === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category === filterCategory);

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgExpense = expenses.length ? totalAmount / expenses.length : 0;
  const maxExpense = expenses.length ? Math.max(...expenses.map(e => e.amount)) : 0;
  const monthlyData = analyzeMonthlySpending(expenses);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen luxury-gradient flex items-center justify-center p-4">
        <div className="card-container rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wallet className="text-blue-500 w-12 h-12" />
              <h1 className="text-3xl font-bold text-gray-900">
                Expense Tracker Pro
              </h1>
            </div>
            <p className="text-gray-600">Please login to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="text-blue-500" size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="glass-input w-full pl-10 pr-4 py-3 rounded-xl"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="text-blue-500" size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="glass-input w-full pl-10 pr-4 py-3 rounded-xl"
                />
              </div>
            </div>

            {loginError && (
              <div className="text-red-500 text-sm text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="cosmic-button w-full text-white rounded-xl px-6 py-4 flex items-center justify-center gap-2 font-semibold"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen luxury-gradient py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="text-center mb-12 relative">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="cosmic-button text-white px-4 py-2 rounded-xl flex items-center gap-2 absolute right-0 top-0"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wallet className="text-blue-400 w-10 h-10" />
            <h1 className="text-4xl font-bold text-white">
              Expense Tracker Pro
            </h1>
          </div>
          <p className="text-blue-200 text-lg">Manage your expenses with style</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stats-card rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Expenses</p>
              <h3 className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</h3>
            </div>
            <DollarSign className="text-blue-500 w-8 h-8" />
          </div>
          
          <div className="stats-card rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Average Expense</p>
              <h3 className="text-2xl font-bold text-gray-900">${avgExpense.toFixed(2)}</h3>
            </div>
            <TrendingUp className="text-green-500 w-8 h-8" />
          </div>
          
          <div className="stats-card rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Highest Expense</p>
              <h3 className="text-2xl font-bold text-gray-900">${maxExpense.toFixed(2)}</h3>
            </div>
            <ArrowUpCircle className="text-red-500 w-8 h-8" />
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="mb-8">
          <AnalyticsDashboard expenses={expenses} />
        </div>

        {/* Monthly Chart */}
        {monthlyData.length > 0 && (
          <div className="card-container rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Spending Analysis</h2>
            <MonthlyChart data={monthlyData} />
          </div>
        )}

        {/* Main Card */}
        <div className="card-container rounded-2xl p-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Expense Name"
                required
                defaultValue={editingExpense?.name}
                className="glass-input w-full px-4 py-3 rounded-xl"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <DollarSign className="text-blue-500" size={18} />
              </div>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                required
                step="0.01"
                defaultValue={editingExpense?.amount}
                className="glass-input w-full pl-10 pr-4 py-3 rounded-xl"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Tag className="text-blue-500" size={18} />
              </div>
              <select
                name="category"
                required
                defaultValue={editingExpense?.category || ""}
                className="glass-input w-full pl-10 pr-4 py-3 rounded-xl appearance-none"
              >
                <option value="" disabled>Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Calendar className="text-blue-500" size={18} />
              </div>
              <input
                type="date"
                name="date"
                required
                defaultValue={editingExpense?.date}
                className="glass-input w-full pl-10 pr-4 py-3 rounded-xl"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <button
                type="submit"
                className="shimmer-button w-full text-white rounded-xl px-6 py-4 flex items-center justify-center gap-2 font-semibold text-lg"
              >
                <PlusCircle size={24} />
                {editingExpense ? 'Update' : 'Add'} Expense
              </button>
            </div>
          </form>

          {/* Filter */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="filter-category" className="text-gray-700 font-medium">
                Filter by Category:
              </label>
              <select
                id="filter-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="glass-input px-4 py-2 rounded-xl"
              >
                <option value="All">All</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr 
                    key={expense.id} 
                    className="expense-row hover:bg-gray-50 transition-all duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="border-t px-6 py-4 text-gray-800">{expense.name}</td>
                    <td className="border-t px-6 py-4 text-gray-800">${expense.amount.toFixed(2)}</td>
                    <td className="border-t px-6 py-4">
                      <span className="category-badge px-4 py-1 rounded-full text-sm text-blue-700 font-medium">
                        {expense.category}
                      </span>
                    </td>
                    <td className="border-t px-6 py-4 text-gray-800">{expense.date}</td>
                    <td className="border-t px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-all duration-200"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No expenses found. Add your first expense above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;