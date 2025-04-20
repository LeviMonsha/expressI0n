const { body } = require("express-validator");

const registrationValidationRules = [
  body("firstName")
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage("Имя должно быть от 2 до 15 символов")
    .matches(/^[А-Яа-яЁёA-Za-z]+$/)
    .withMessage("Имя должно содержать только буквы"),

  body("lastName")
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage("Фамилия должна быть от 2 до 15 символов")
    .matches(/^[А-Яа-яЁёA-Za-z]+$/)
    .withMessage("Фамилия должна содержать только буквы")
    .custom((value) => {
      if (value.includes(" ") || value.includes("-")) {
        throw new Error("Двойные фамилии запрещены");
      }
      return true;
    }),

  body("email").isEmail().withMessage("Неверный формат email").normalizeEmail(),

  body("login")
    .isLength({ min: 6 })
    .withMessage("Логин должен быть не менее 6 символов"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Пароль должен быть не менее 8 символов")
    .matches(/[a-z]/)
    .withMessage("Пароль должен содержать строчные буквы")
    .matches(/[A-Z]/)
    .withMessage("Пароль должен содержать прописные буквы")
    .matches(/\d/)
    .withMessage("Пароль должен содержать цифры")
    .matches(/[\W_]/)
    .withMessage("Пароль должен содержать специальные символы"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Пароли не совпадают");
    }
    return true;
  }),

  body("age").isIn(["yes", "no"]).withMessage("Выберите возраст"),

  body("gender").isIn(["male", "female"]).withMessage("Выберите пол"),
];

module.exports = registrationValidationRules;
