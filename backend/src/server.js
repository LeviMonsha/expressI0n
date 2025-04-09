const express = require("express");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const sequelize = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error("Ошибка синхронизации базы данных:", err));
