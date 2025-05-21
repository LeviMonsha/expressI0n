require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "postgres",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "expressI0n",
    port: process.env.DB_PORT || 5432,
  },
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "jwt_access_secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "jwt_refresh_secret",
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY || "",
    secretKey: process.env.RECAPTCHA_SECRET_KEY || "",
  },
};
