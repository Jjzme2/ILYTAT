// baseService.js
const { DatabaseService } = require('../index');

class BaseAPIService {
	constructor(table, schema = 'api') {
		this.table = table;
		this.schema = schema;
		this.db = new DatabaseService();
	}

	async getEmpty() {
		return {
			message:
				'This is an empty BaseAPIService object. Please ensure the child also includes a getEmpty method.',
			type: this.typeof(),
		};
	}

	async getIdFromName(name) {
		const text = `SELECT id FROM ${this.schema}.${this.table} WHERE name = $1`;
		const params = [name];

		try {
			return await this.db.query(text, params);
		} catch (error) {
			console.error('Query error:', error);
			throw error;
		}
	}

	async list() {
		const text = `SELECT * FROM ${this.schema}.${this.table}`;
		const params = [];

		try {
			return await this.db.query(text, params);
		} catch (error) {
			console.error('Query error:', error);
			throw error;
		}
	}

	async getOne(id) {
		const text = `SELECT * FROM ${this.schema}.${this.table} WHERE id = $1`;
		const params = [id];

		try {
			return await this.db.query(text, params);
		} catch (error) {
			console.error('Query error:', error);
			throw error;
		}
	}

	async getActive(isActive = true) {
		const text = `SELECT * FROM ${this.schema}.${this.table} WHERE is_active = $1`;
		const params = [isActive];

		try {
			return await this.db.query(text, params);
		} catch (error) {
			console.error('Query error:', error);
			throw error;
		}
	}

	async getFromTableWhere(table, where, customParams) {
		const text = `SELECT * FROM ${this.schema}.${table} WHERE ${where}`;
		if (customParams) {
			const params = [customParams];
		}

		try {
			if (customParams) {
				return await this.db.query(text, params);
			} else {
				return await this.db.query(text);
			}
		} catch (error) {
			console.error('Query error:', error);
			throw error;
		}
	}
}

module.exports = BaseAPIService;
