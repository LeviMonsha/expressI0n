const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const registrationValidationRules = require("../validation/registrationRules");

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = {};
    errors.array().forEach((err) => {
      extractedErrors[err.param] = err.msg;
    });

    return res.status(400).json({ errors: extractedErrors });
  }

  const { firstName, lastName, email, login, password, age, gender } = req.body;

  try {
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: "Email уже используется" });
    }
    const existingLogin = await User.findByLogin(login);
    if (existingLogin) {
      return res.status(400).json({ error: "Логин уже используется" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      login,
      passwordHash,
      age,
      gender,
    });

    res
      .status(201)
      .json({ message: "Пользователь зарегистрирован", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

module.exports = {
  registrationValidationRules,
  registerUser,
};
