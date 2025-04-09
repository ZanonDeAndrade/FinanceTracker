import React from 'react';
import { Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function TransactionList({ transactions, onDeleteTransaction, filter, onFilterChange, loading }) {
  const { darkMode } = useTheme();

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transações</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 rounded-md text-sm ${filter === 'all' ? 
              (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') : 
              (darkMode ? 'bg-gray-700' : 'bg-gray-200')}`}
          >
            Todas
          </button>
          <button 
            onClick={() => onFilterChange('income')}
            className={`px-3 py-1 rounded-md text-sm ${filter === 'income' ? 
              (darkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800') : 
              (darkMode ? 'bg-gray-700' : 'bg-gray-200')}`}
          >
            Receitas
          </button>
          <button 
            onClick={() => onFilterChange('expense')}
            className={`px-3 py-1 rounded-md text-sm ${filter === 'expense' ? 
              (darkMode ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800') : 
              (darkMode ? 'bg-gray-700' : 'bg-gray-200')}`}
          >
            Despesas
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-500">Carregando transações...</p>
        </div>
      ) : transactions.length > 0 ? (
        <div className="overflow-auto max-h-96">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <tr>
                <th className="p-2 text-left">Descrição</th>
                <th className="p-2 text-left">Categoria</th>
                <th className="p-2 text-left">Categoria</th>
                <th className="p-2 text-left">Data</th>
                <th className="p-2 text-right">Valor</th>
                <th className="p-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr 
                  key={transaction._id}
                  className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <td className="p-3">{transaction.description}</td>
                  <td className="p-3">{transaction.category}</td>
                  <td className="p-3">{formatDate(transaction.date)}</td>
                  <td className={`p-3 text-right font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => onDeleteTransaction(transaction._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          {filter === 'all' 
            ? 'Nenhuma transação registrada' 
            : filter === 'income' 
              ? 'Nenhuma receita registrada' 
              : 'Nenhuma despesa registrada'}
        </div>
      )}
    </div>
  );
}
