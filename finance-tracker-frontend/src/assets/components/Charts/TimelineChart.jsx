import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';

export default function TimelineChart({ transactions, loading }) {
  const { darkMode } = useTheme();

  // Dados para gráfico de linha (saldo ao longo do tempo)
  const timelineData = (() => {
    const data = [];
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 5);
    
    for (let i = 0; i < 6; i++) {
      const monthDate = new Date(sixMonthsAgo);
      monthDate.setMonth(sixMonthsAgo.getMonth() + i);
      const month = monthDate.toLocaleString('pt-BR', { month: 'short' });
      const year = monthDate.getFullYear();
      const monthLabel = `${month}/${year}`;
      
      const monthIncome = transactions
        .filter(t => {
          const tDate = new Date(t.date);
          return t.type === 'income' && 
                 tDate.getMonth() === monthDate.getMonth() && 
                 tDate.getFullYear() === monthDate.getFullYear();
        })
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      
      const monthExpenses = transactions
        .filter(t => {
          const tDate = new Date(t.date);
          return t.type === 'expense' && 
                 tDate.getMonth() === monthDate.getMonth() && 
                 tDate.getFullYear() === monthDate.getFullYear();
        })
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      
      data.push({
        name: monthLabel,
        receita: monthIncome,
        despesa: monthExpenses,
        saldo: monthIncome - monthExpenses
      });
    }
    
    return data;
  })();

  if (loading) {
    return (
      <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Fluxo Financeiro</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  const formatTooltipValue = (value) => {
    return `R$ ${value.toFixed(2)}`;
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Fluxo Financeiro</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timelineData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [formatTooltipValue(value), 'Valor']}
            contentStyle={darkMode ? {backgroundColor: '#374151', border: '1px solid #4B5563'} : {}}
            labelStyle={darkMode ? {color: 'white'} : {}}
            itemStyle={darkMode ? {color: 'white'} : {}}
          />
          <Legend />
          <Line type="monotone" dataKey="receita" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="despesa" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="saldo" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
