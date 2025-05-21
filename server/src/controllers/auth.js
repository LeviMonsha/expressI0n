const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User.js");

let refreshTokens = [];

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("pages/auth/register", {
      errors: errors.array(),
      data: req.body,
    });
  }
  console.log(req.body);
  const { firstName, lastName, email, password, username, isAdult, gender } =
    req.body;

  try {
    const existingEmail = await User.findByEmail(email);
    const existingUsername = await User.findByUsername(username);

    if (existingEmail) {
      return res.status(400).render("pages/auth/register", {
        error: "Пользователь с таким email уже существует",
        data: req.body,
      });
    }

    if (existingUsername) {
      return res.status(400).render("pages/auth/register", {
        error: "Пользователь с таким логином уже существует",
        data: req.body,
      });
    }

    const isAdultOut = isAdult === "true";

    await User.create({
      username,
      email,
      firstName,
      lastName,
      isAdult: isAdultOut,
      gender,
      password,
      isDarkTheme: false,
    });

    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/auth/register", {
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
      return res.status(400).render("pages/auth/login", {
        recaptchaSiteKey: config.recaptcha.siteKey,
        error: "Неверный email или пароль",
        data: req.body,
      });
    }

    const validPassword = await User.verifyPassword(user, password);
    if (!validPassword) {
      return res.status(400).render("pages/auth/login", {
        recaptchaSiteKey: config.recaptcha.siteKey,
        error: "Неверный email или пароль",
        data: req.body,
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      config.jwtAccessSecret || "jwt_access_secret",
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      config.jwtRefreshSecret || "jwt_refresh_secret",
      { expiresIn: "7d" }
    );

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/auth/token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });

    res.redirect("/content/main");
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/auth/login", {
      recaptchaSiteKey: config.recaptcha.siteKey,
      error: "Ошибка сервера",
      data: req.body,
    });
  }
}

function token(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ error: "Invalid refresh token" });

  jwt.verify(
    refreshToken,
    config.jwtRefreshSecret || "jwt_refresh_secret",
    (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid refresh token" });

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        config.jwtAccessSecret || "jwt_access_secret",
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
}

function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.clearCookie("refreshToken", { path: "/auth/token" });
  res.redirect("/");
}

module.exports = { register, login, logout, token };
