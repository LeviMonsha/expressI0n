const express = require("express");
const jwt = require("jsonwebtoken");
const registrationValidationRules = require("../validation/registration-rules");
const { validationResult } = require("express-validator");
const { register } = require("../controllers/auth");
const User = require("../models/User");
const config = require("../config");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("pages/auth/register");
});

router.get("/login", (req, res) => {
  res.render("pages/auth/login", {
    recaptchaSiteKey: config.recaptcha.siteKey,
    message: null,
  });
});

router.post(
  "/register",
  registrationValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = errors
        .array()
        .map((err) => ({ param: err.param, msg: err.msg }));
      return res.status(422).render("pages/auth/register", {
        errors: extractedErrors,
        data: req.body,
      });
    }
    next();
  },
  register
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const captchaResponse = req.body["g-recaptcha-response"];
    if (!captchaResponse) {
      return res.status(400).render("pages/auth/login", {
        recaptchaSiteKey: config.recaptcha.siteKey,
        message: "Пожалуйста, подтвердите, что вы не робот",
        data: req.body,
      });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).render("pages/auth/login", {
        recaptchaSiteKey: config.recaptcha.siteKey,
        message: "Неверный email или пароль",
        data: req.body,
      });
    }

    const validPassword = await User.verifyPassword(user, password);
    if (!validPassword) {
      return res.status(400).render("pages/auth/login", {
        recaptchaSiteKey: config.recaptcha.siteKey,
        message: "Неверный email или пароль",
        data: req.body,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      config.jwtSecret || "jwt_secret",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.redirect("/content/main");
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/auth/login", {
      recaptchaSiteKey: config.recaptcha.siteKey,
      message: "Ошибка сервера",
      data: req.body,
    });
  }
});

module.exports = router;
