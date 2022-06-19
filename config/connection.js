require('dotenv').config();

const { Pool, types } = require('pg');

const pool = new Pool();

types.setTypeParser(1700, (val) => {
  return parseFloat(val);
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  getClient: () => {
    return pool.connect();
  }
};
