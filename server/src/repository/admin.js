const pool = require("../db");

class AdminQueries {
  async findTotalUsers() {
    const result = await pool.query("SELECT COUNT(*) AS count FROM users");
    return result.rows[0].count;
  }

  async findLastMonthUsers() {
    const result = await pool.query(
      "SELECT COUNT(*) AS count FROM users WHERE created >= (CURRENT_DATE - INTERVAL '1 month')"
    );
    return result.rows[0].count;
  }

  async findLastUser() {
    const result = await pool.query(
      "SELECT id, username, email, first_name, last_name, is_adult, gender, created FROM users ORDER BY id DESC LIMIT 1"
    );
    return result.rows[0] || null;
  }
}

module.exports = new AdminQueries();
