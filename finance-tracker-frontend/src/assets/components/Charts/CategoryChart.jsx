import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';

export default function CategoryChart({ transactions, loading }) {
  const { darkMode } = useTheme();
  const categories = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'];
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];

  // Dados para gráfico de categorias
  const categoryData = categories.map(category => {
    const amount = transactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    return {
      name: category,
      value: amount
    };
  }).filter(item => item.value > 0);

  if (loading) {
    return (
      <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Despesas por Categoria</h2>
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
      <h2 className="text-xl font-semibold mb-4">Despesas por Categoria</h2>
      {categoryData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [formatTooltipValue(value), 'Valor']}
              contentStyle={darkMode ? {backgroundColor: '#374151', border: '1px solid #4B5563'} : {}}
              labelStyle={darkMode ? {color: 'white'} : {}}
              itemStyle={darkMode ? {color: 'white'} : {}}
            />
            <Bar dataKey="value">
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          Nenhuma despesa registrada por categoria
        </div>
      )}
    </div>
  );
}
