const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/register", {
      errors: errors.array(),
      data: req.body,
    });
  }

  const { firstName, lastName, email, password, login, age, gender } = req.body;

  try {
    const existingEmail = await User.findByEmail(email);
    const existingLogin = await User.findByUsername(login);

    if (existingEmail) {
      return res.status(400).render("auth/register", {
        error: "Пользователь с таким email уже существует",
        data: req.body,
      });
    }
    if (existingLogin) {
      return res.status(400).render("auth/register", {
        error: "Пользователь с таким логином уже существует",
        data: req.body,
      });
    }

    const isAdult = age === "yes";

    await User.create({
      username: login,
      email,
      firstName,
      lastName,
      isAdult,
      gender,
      password,
      isDarkTheme: false,
    });

    res.redirect("auth/login");
  } catch (err) {
    console.error(err);
    res.status(500).render("auth/register", {
      error: "Ошибка сервера",
      data: req.body,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).render("auth/login", {
        error: "Неверный email или пароль",
        data: req.body,
      });
    }

    const validPassword = await User.verifyPassword(user, password);
    if (!validPassword) {
      return res.status(400).render("auth/login", {
        error: "Неверный email или пароль",
        data: req.body,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .render("auth/login", { error: "Ошибка сервера", data: req.body });
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/");
}

module.exports = { register, login, logout };
