const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin");
const authMiddleware = require("../middleware/auth");
const themeMiddleware = require("../middleware/theme");

router.get("/", authMiddleware, themeMiddleware, (req, res) => {
  res.render("pages/content/admin");
});

router.get("/total-users", async (req, res) => {
  try {
    const count = await AdminController.findTotalUsers();
    res.json({ count });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/last-month-users", async (req, res) => {
  try {
    const count = await AdminController.findLastMonthUsers();
    res.json({ count });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/last-user", async (req, res) => {
  try {
    const user = await AdminController.findLastUser();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/statistics", async (req, res) => {
  try {
    const [totalUsers, lastMonthUsers, lastUser] = await Promise.all([
      AdminController.findTotalUsers(),
      AdminController.findLastMonthUsers(),
      AdminController.findLastUser(),
    ]);

    const theme = req.query.theme === "dark" ? "dark" : "light";

    res.render("statistics", {
      totalUsers,
      lastMonthUsers,
      lastUser,
      theme,
      error: null,
    });
  } catch (error) {
    res.render("statistics", {
      totalUsers: 0,
      lastMonthUsers: 0,
      lastUser: {},
      theme: req.query.theme === "dark" ? "dark" : "light",
      error: error.message,
    });
  }
});

module.exports = router;
