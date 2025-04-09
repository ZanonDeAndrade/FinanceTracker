const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Valor é obrigatório']
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros']
  },
  type: {
    type: String,
    required: [true, 'Tipo é obrigatório'],
    enum: ['income', 'expense']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
