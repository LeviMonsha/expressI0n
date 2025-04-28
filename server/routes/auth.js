const express = require("express");
const router = express.Router();
const {
  registrationValidationRules,
  registerUser,
} = require("../controllers/auth");

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", registrationValidationRules, registerUser);

module.exports = router;
