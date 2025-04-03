const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.status(200).send(`Пользователь ${username} успешно зарегистрирован!`);
  } else {
    res.status(400).send("Ошибка: Все поля обязательны!");
  }
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
