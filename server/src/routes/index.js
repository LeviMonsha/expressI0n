const express = require("express");
const cookieParser = require("cookie-parser");
const cookieConsentMiddleware = require("../middleware/cookie-consent");

const router = express.Router();

router.use(cookieParser());
router.use(cookieConsentMiddleware);

router.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
