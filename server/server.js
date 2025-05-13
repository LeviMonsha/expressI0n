const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const server = express();

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "pug");

dotenv.config();

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public")));

server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/", indexRouter);

server.use(function (req, res, next) {
  const createError = require("http-errors");
  next(createError(404));
});

server.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
});

server.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = server;
