import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceSummary({ balance, income, expenses, loading }) {
  const { darkMode } = useTheme();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1,2,3].map((i) => (
          <div key={i} className={`p-6 rounded-lg shadow-md animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-lg font-semibold mb-2">Saldo Atual</h2>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
      <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-lg font-semibold mb-2">Receitas</h2>
        <p className="text-2xl font-bold text-green-500">
          {formatCurrency(income)}
        </p>
      </div>
      <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-lg font-semibold mb-2">Despesas</h2>
        <p className="text-2xl font-bold text-red-500">
          {formatCurrency(expenses)}
        </p>
      </div>
    </div>
  );
}
