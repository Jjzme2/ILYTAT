require('dotenv').config();
const { Pool } = require('pg');

class DatabaseService {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async query(
    text,
    params,
    options = {
      showFields: false,
      showRowCount: false,
      showCommand: false,
      showQuery: false,
    }
  ) {
    const client = await this.pool.connect();
    console.log('Contacting database');
    try {
      const res = await client.query(text, params);
      const response = {};
      if (options.showQuery) response.query = { text, params };
      if (options.showFields) response.fields = res.fields;
      if (options.showRowCount) response.rowCount = res.rowCount;
      if (options.showCommand) response.command = res.command;
      response.rows = res.rows;

      if (
        !options.showFields &&
        !options.showRowCount &&
        !options.showCommand &&
        !options.showQuery
      )
        return res.rows;
      else return response;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      client.release();
      console.log('Releasing connection to the database.');
    }
  }

  async getCurrentTimestamp(doSeparate = false) {
    const query = 'SELECT NOW()';
    const result = await this.query(query, []).then((res) => res[0].now);
    if (!doSeparate) return result;
    else {
      const date = result.toISOString().split('T')[0];
      const time = result.toISOString().split('T')[1].split('.')[0];
      return { date, time };
    }
    // return result;
  }

  async listAllFromTable(table, schema = 'api') {
    const query = `SELECT * FROM ${schema}.${table}`;
    const result = await this.query(query, []);

    if (result.length < 1) {
      return 'No Records Found!';
    }

    return result;
  }

  async getRowById(table, id, schema = 'api') {
    const query = `SELECT * FROM ${schema}.${table} WHERE id = $1`;
    const result = await this.query(query, [id]);
    return result;
  }

  async listAllActiveFromTable(table, schema = 'api') {
    const query = `SELECT * FROM ${schema}.${table} WHERE active = true`;
    const result = await this.query(query, []);
    return result;
  }
}

module.exports = DatabaseService;
