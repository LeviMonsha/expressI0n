const jwt = require("jsonwebtoken");
const config = require("../config");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    if (req.accepts("html")) {
      return res.redirect("/auth/login");
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    if (req.accepts("html")) {
      return res.redirect("/auth/login");
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
}

module.exports = authMiddleware;
