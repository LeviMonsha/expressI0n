const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard", { email: req.user.email });
});

router.get("/main", (req, res) => {
  res.render("content/main");
});

module.exports = router;
