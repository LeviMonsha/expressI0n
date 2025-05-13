const express = require("express");
const registrationValidationRules = require("../validation/registrationRules");
const { validationResult } = require("express-validator");
const { register } = require("../controllers/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

// router.post(
//   "/register",
//   registrationValidationRules,
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const extractedErrors = errors
//         .array()
//         .map((err) => ({ param: err.param, msg: err.msg }));
//       return res
//         .status(422)
//         .render("auth/register", { errors: extractedErrors, data: req.body }); // исправлено
//     }
//     next();
//   },
//   register
// );

router.post("/register", async (req, res) => {
  try {
    const { username, email, firstName, lastName, password, isAdult, gender } =
      req.body;

    const existingEmail = await User.findByEmail(email);
    const existingUsername = await User.findByUsername(username);

    if (existingEmail) {
      return res.status(400).render("auth/register", {
        error: "Пользователь с таким email уже существует",
        data: req.body,
      });
    }

    if (existingUsername) {
      return res.status(400).render("auth/register", {
        error: "Пользователь с таким именем пользователя уже существует",
        data: req.body,
      });
    }

    await User.create({
      username,
      email,
      firstName,
      lastName,
      isAdult: isAdult === "true" || isAdult === true,
      gender,
      password,
    });

    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.status(500).render("auth/register", {
      error: "Ошибка при регистрации пользователя",
      data: req.body,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

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

    // const token = jwt.sign(
    //   { id: user.id, email: user.email, username: user.username },
    //   JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    // res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    res.redirect("/main");
  } catch (err) {
    console.error(err);
    res.status(500).render("auth/login", {
      error: "Ошибка сервера",
      data: req.body,
    });
  }
});

module.exports = router;
