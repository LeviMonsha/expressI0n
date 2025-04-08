const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
