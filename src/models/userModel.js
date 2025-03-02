const pool = require('../config/database');

const createUser = async (username, password, role) => {
  const query = `INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *`;
  const values = [username, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = $1`;
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

module.exports = { createUser, getUserByUsername };
