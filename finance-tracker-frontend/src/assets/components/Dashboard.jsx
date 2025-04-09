import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import BalanceSummary from './BalanceSummary';
import CategoryChart from './Charts/CategoryChart';
import TimelineChart from './Charts/TimelineChart';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { getTransactions, createTransaction, deleteTransaction } from '../../services/api';

export default function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar transações. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const savedTransaction = await createTransaction(newTransaction);
      setTransactions(prev => [...prev, savedTransaction]);
    } catch (err) {
      setError('Erro ao adicionar transação. Por favor, tente novamente.');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError('Erro ao excluir transação. Por favor, tente novamente.');
    }
  };

  const calculateTotals = () => {
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += parseFloat(transaction.amount);
      } else {
        totalExpenses += parseFloat(transaction.amount);
      }
    });
    
    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setBalance(totalIncome - totalExpenses);
  };

  // Filtrar transações
  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Controle Financeiro</h1>
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <BalanceSummary balance={balance} income={income} expenses={expenses} loading={loading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CategoryChart transactions={transactions} loading={loading} />
          <TimelineChart transactions={transactions} loading={loading} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TransactionForm onAddTransaction={handleAddTransaction} />
          
          <div className="md:col-span-2">
            <TransactionList 
              transactions={filteredTransactions} 
              onDeleteTransaction={handleDeleteTransaction}
              filter={filter}
              onFilterChange={setFilter}
              loading={loading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
