const { check, validationResult } = require("express-validator");

const validateRegistration = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Имя пользователя должно быть заполнено"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Пароль должен быть заполнен"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Пароли не совпадают");
    }
    return true;
  }),
];

const validateLogin = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Имя пользователя должно быть заполнено"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Пароль должен быть заполнен"),
];

module.exports = { validateRegistration, validateLogin };
