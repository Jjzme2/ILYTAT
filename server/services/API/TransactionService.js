const BaseService = require('./.baseAPIService.js');
const Transaction = require('../../models/api/financialObjects/Transaction.js');

class TransactionService extends BaseService {
  constructor() {
    super('transactions');
  }

  getEmpty() {
    return new Transaction();
  }

  createItem(data) {
    // ?There must be a more concice way to write this.

    return new Transaction(
      data.id,
      data.name,
      data.created_on,
      data.amount,
      data.is_income
    );
  }

  getExpenses() {
    return this.getFromTableWhere('transactions', "is_income = '0'");
  }

  getTransactionsBetweenDates(startDate, endDate) {
    return this.getFromTableWhere(
      'transactions',
      'created_on BETWEEN $1 AND $2',
      [startDate, endDate]
    );
  }
}

module.exports = TransactionService;
