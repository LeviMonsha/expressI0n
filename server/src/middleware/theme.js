function themeMiddleware(req, res, next) {
  res.locals.theme = req.cookies.theme || "light";
  next();
}

module.exports = themeMiddleware;
