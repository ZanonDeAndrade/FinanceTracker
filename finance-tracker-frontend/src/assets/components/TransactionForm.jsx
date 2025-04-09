import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function TransactionForm({ onAddTransaction }) {
  const { darkMode } = useTheme();
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().substr(0, 10)
  });

  // Categorias predefinidas
  const categories = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    const transactionData = {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };
    
    onAddTransaction(transactionData);
    
    // Limpar formulário
    setNewTransaction({
      description: '',
      amount: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().substr(0, 10)
    });
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Descrição</label>
          <input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            placeholder="Ex: Salário, Supermercado..."
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Valor (R$)</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            value={newTransaction.amount}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            placeholder="0.00"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Categoria</label>
          <select
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="">Selecione</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Data</label>
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Tipo</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={newTransaction.type === 'income'}
                onChange={handleInputChange}
                className="mr-2"
              />
              Receita
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={newTransaction.type === 'expense'}
                onChange={handleInputChange}
                className="mr-2"
              />
              Despesa
            </label>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Adicionar
        </button>
      </form>
    </div>
  );
}
