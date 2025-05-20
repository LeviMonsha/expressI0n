const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const themeMiddleware = require("../middleware/theme");

async function getUserProfile(userId) {
  return {
    login: "ivan123",
    name: "Иван",
    surname: "Иванов",
    email: "ivan@example.com",
    ismale: true,
    isadult: true,
  };
}

router.get("/main", themeMiddleware, (req, res) => {
  res.render("pages/content/main", { theme: res.locals.theme });
});

router.get("/profile", authMiddleware, themeMiddleware, async (req, res) => {
  try {
    const profileData = await getUserProfile(req.user.id);
    res.render("pages/content/profile", {
      profileData,
      theme: res.locals.theme,
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
