const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

const authMiddleware = require("../middleware/auth");
const themeMiddleware = require("../middleware/theme");

router.get("/main", themeMiddleware, (req, res) => {
  res.render("pages/content/main", { theme: res.locals.theme });
});

router.get("/profile", authMiddleware, themeMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).render("pages/content/profile", {
        profileData: null,
        theme: res.locals.theme,
        error: "Пользователь не найден",
      });
    }

    const profileData = {
      login: user.username,
      name: user.first_name,
      surname: user.last_name,
      email: user.email,
      ismale: user.gender === "Мужской",
      isadult: user.is_adult,
    };

    res.render("pages/content/profile", {
      profileData,
      theme: res.locals.theme,
      error: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
});

router.get("/settings", themeMiddleware, (req, res) => {
  res.render("pages/content/settings", { theme: res.locals.theme });
});

router.post("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

module.exports = router;
