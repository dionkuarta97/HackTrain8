function admin(req, res, next) {
  if (req.session.role === 1) {
    next();
    return;
  }
  res.redirect("/");
}

function user(req, res, next) {
  if (req.session.role === 1) {
    next();
    return;
  }
  res.redirect("/");
}

module.exports = [admin, user];
