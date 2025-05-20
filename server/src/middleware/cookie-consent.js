function cookieConsentMiddleware(req, res, next) {
  const consent = req.cookies.user_cookie_consent;
  res.locals.showCookieBanner = !consent;
  next();
}

module.exports = cookieConsentMiddleware;
