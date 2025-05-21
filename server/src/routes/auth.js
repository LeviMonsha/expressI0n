const express = require("express");
const { validationResult } = require("express-validator");
const registrationValidationRules = require("../validation/registration-rules");
const { register, login, logout, token } = require("../controllers/auth");
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

// router.post(
//   "/register",
//   registrationValidationRules,
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const extractedErrors = errors
//         .array()
//         .map((err) => ({ param: err.param, msg: err.msg }));
//       return res.status(422).render("pages/auth/register", {
//         errors: extractedErrors,
//         data: req.body,
//       });
//     }
//     next();
//   },
//   register
// );
router.post("/register", register);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // const captchaResponse = req.body["g-recaptcha-response"];
    // if (!captchaResponse) {
    //   return res.status(400).render("pages/auth/login", {
    //     recaptchaSiteKey: config.recaptcha.siteKey,
    //     message: "Пожалуйста, подтвердите, что вы не робот",
    //     data: req.body,
    //   });
    // }

    // Используем контроллер login, который теперь возвращает accessToken в JSON
    await login(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/auth/login", {
      recaptchaSiteKey: config.recaptcha.siteKey,
      message: "Ошибка сервера",
      data: req.body,
    });
  }
});

router.post("/token", token);

router.post("/logout", logout);

module.exports = router;
