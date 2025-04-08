const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Ошибка: Все поля обязательны!");
  }

  if (password.length < 6) {
    return res
      .status(400)
      .send("Ошибка: Пароль должен быть не менее 6 символов!");
  }

  res.status(200).send(`Пользователь ${username} успешно зарегистрирован!`);
});

module.exports = router;
