const db = require("../db");
const bcrypt = require("bcrypt");

class User {
  static async create({
    username,
    email,
    firstName,
    lastName,
    isAdult,
    gender,
    password,
    isDarkTheme = false,
  }) {
    const passwordHash = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users 
        (username, email, first_name, last_name, is_adult, gender, password_hash, is_dark_theme, created)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_DATE)
      RETURNING 
        id, username, email, first_name, last_name, is_adult, gender, is_dark_theme, created
    `;

    const values = [
      username,
      email,
      firstName,
      lastName,
      isAdult,
      gender,
      passwordHash,
      isDarkTheme,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return res.rows[0];
  }

  static async findByUsername(username) {
    const res = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return res.rows[0];
  }

  static async verifyPassword(user, password) {
    return bcrypt.compare(password, user.password_hash);
  }

  static async updateThemePreference(userId, isDarkTheme) {
    const res = await db.query(
      "UPDATE users SET is_dark_theme = $1 WHERE id = $2 RETURNING is_dark_theme",
      [isDarkTheme, userId]
    );
    return res.rows[0].is_dark_theme;
  }
}

module.exports = User;
