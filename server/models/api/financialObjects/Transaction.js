const BaseAPi = require('../baseApi');

class Transaction extends BaseAPi {
	constructor(id, name, created_on, amount, isIncome) {
		super(id, name, created_on);
		this.amount = amount;
		this.isIncome = isIncome == 0 ? false : true;
	}

	update(data) {
		if (!data.name || !data.amount || !data.isIncome) {
			throw new Error('Invalid data. Please provide all required fields.');
		}
		this.name = data.name;
		this.amount = data.amount;
		this.isIncome = data.isIncome;
		return true;
	}
}

module.exports = Transaction;
