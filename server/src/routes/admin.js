const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin");
const authMiddleware = require("../middleware/auth");
const themeMiddleware = require("../middleware/theme");

router.get("/", authMiddleware, themeMiddleware, async (req, res) => {
  try {
    const [totalUsers, lastMonthUsers, lastUser] = await Promise.all([
      AdminController.findTotalUsers(),
      AdminController.findLastMonthUsers(),
      AdminController.findLastUser(),
    ]);

    const theme = req.query.theme === "dark" ? "dark" : "light";

    res.render("pages/content/admin", {
      totalUsers,
      lastMonthUsers,
      lastUser,
      theme,
      error: null,
    });
  } catch (error) {
    console.error("Ошибка загрузки статистики:", error);
    res.render("pages/content/admin", {
      totalUsers: 0,
      lastMonthUsers: 0,
      lastUser: {},
      theme: req.query.theme === "dark" ? "dark" : "light",
      error: error.message,
    });
  }
});

module.exports = router;
