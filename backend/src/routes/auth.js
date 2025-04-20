const express = require("express");
const router = express.Router();
const {
  registrationValidationRules,
  registerUser,
} = require("../controllers/auth");

router.post("/register", registrationValidationRules, registerUser);

module.exports = router;
