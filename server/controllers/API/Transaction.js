//  !This is old code. It is not being used. It is only here for reference. It will need to be updated to work with the new code. This is expected to be called from the Router.

const ApiController = require('./ApiController.js');
const type_services = require('../../services/API/TransactionService.js');
const Transaction = require('../../models/api/financialObjects/Transactions.js');

const myService = new type_services();

class TransactionController extends ApiController {
	constructor() {
		super(new type_services(), Transaction);
	}

	//   This should be separated into separate functions, instead of getExpenses returning the remainder and total.
	async getExpenses() {
		const list = await myService.getExpenses();
		const items = list.map((item) => this.service.createItem(item));

		// *This will need to be separated.

		// let total = 0;
		// let remainder = 0;

		// list.forEach(item => {
		// 	total += Number(item.amount);
		// 	remainder = Number(932.11) - total;
		// });

		// return {
		// 	items: items,
		// 	total: total,
		// 	remainder: remainder,
		// }

		return items;
	}

	async getTransactionsBetweenDates(startDate, endDate) {
		if (!startDate || !endDate) {
			throw new Error(
				'Please ensure to include a start date and end date in the getTransactionsBetweenDates function in the TransactionController.'
			);
		}
		const list = await myService.getTransactionsBetweenDates(
			startDate,
			endDate
		);

		const items = list.map((item) => this.service.createItem(item));
		return items;
	}
}

module.exports = TransactionController;
