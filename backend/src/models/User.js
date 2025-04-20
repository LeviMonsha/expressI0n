const db = require("../config/db");

class User {
  static async create({
    firstName,
    lastName,
    email,
    login,
    passwordHash,
    age,
    gender,
  }) {
    const query = `
      INSERT INTO users
      (first_name, last_name, email, login, password_hash, age, gender)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id, first_name, last_name, email, login, age, gender
    `;
    const values = [
      firstName,
      lastName,
      email,
      login,
      passwordHash,
      age,
      gender,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async findByLogin(login) {
    const query = `SELECT * FROM users WHERE login = $1`;
    const result = await db.query(query, [login]);
    return result.rows[0];
  }
}

module.exports = User;
