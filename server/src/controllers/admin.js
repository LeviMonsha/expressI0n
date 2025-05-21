const AdminQueries = require("../repository/admin");

class AdminController {
  async findTotalUsers() {
    try {
      const count = await AdminQueries.findTotalUsers();
      return count || 0;
    } catch (error) {
      console.error("Ошибка получения общего количества пользователей:", error);
      throw error;
    }
  }

  async findLastMonthUsers() {
    try {
      const count = await AdminQueries.findLastMonthUsers();
      return count || 0;
    } catch (error) {
      console.error(
        "Ошибка получения количества пользователей за месяц:",
        error
      );
      throw error;
    }
  }

  async findLastUser() {
    try {
      const user = await AdminQueries.findLastUser();
      return user || {};
    } catch (error) {
      console.error("Ошибка получения последнего пользователя:", error);
      throw error;
    }
  }
}

module.exports = new AdminController();
