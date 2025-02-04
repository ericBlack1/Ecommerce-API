const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async createUser(email, password) {
    if (!password || typeof password !== 'string') {
      throw new Error('Password is required and must be a string');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async updatePassword(email, newPassword) {
    if (!newPassword || typeof newPassword !== 'string') {
      throw new Error('New password is required and must be a string');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
  }
}

module.exports = User;

