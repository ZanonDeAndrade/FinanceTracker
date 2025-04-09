const Transaction = require('../models/Transaction');

// @desc    Obter todas as transações
// @route   GET /api/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    // Procurar no banco de dados e ordenar por data descendente
    const transactions = await Transaction.find().sort({ date: -1 });
    
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

// @desc    Adicionar uma nova transação
// @route   POST /api/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { description, amount, category, type, date } = req.body;

    // Validar dados
    if (!description || amount === undefined || !category || !type) {
      return res.status(400).json({ 
        success: false, 
        message: 'Por favor, forneça todos os campos obrigatórios' 
      });
    }

    // Criar transação
    const transaction = await Transaction.create(req.body);

    return res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Obter uma transação específica
// @route   GET /api/transactions/:id
// @access  Public
exports.getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transação não encontrada' 
      });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Atualizar uma transação
// @route   PUT /api/transactions/:id
// @access  Public
exports.updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transação não encontrada' 
      });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Excluir uma transação
// @route   DELETE /api/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transação não encontrada' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Transação excluída com sucesso',
      data: transaction 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obter estatísticas das transações
// @route   GET /api/transactions/stats
// @access  Public
exports.getTransactionStats = async (req, res, next) => {
  try {
    const income = await Transaction.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const expenses = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const categoryExpenses = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);
    
    const stats = {
      income: income.length > 0 ? income[0].total : 0,
      expenses: expenses.length > 0 ? expenses[0].total : 0,
      balance: (income.length > 0 ? income[0].total : 0) - (expenses.length > 0 ? expenses[0].total : 0),
      categories: categoryExpenses.map(item => ({
        category: item._id,
        amount: item.total
      }))
    };
    
    return res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
