const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth");
const { validateRegistration, validateLogin } = require("../utils/validation");

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
