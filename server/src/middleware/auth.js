const jwt = require("jsonwebtoken");
const config = require("../config");

function authMiddleware(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.redirect("/auth/login");
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwtAccessSecret || "jwt_access_secret"
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/auth/login");
  }
}

module.exports = authMiddleware;
