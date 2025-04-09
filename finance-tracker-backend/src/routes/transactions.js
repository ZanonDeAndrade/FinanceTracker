const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats
} = require('../controllers/transactionController');

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction);

router
  .route('/stats')
  .get(getTransactionStats);

router
  .route('/:id')
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
