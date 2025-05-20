require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database",
  },
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY || "",
    secretKey: process.env.RECAPTCHA_SECRET_KEY || "",
  },
};
