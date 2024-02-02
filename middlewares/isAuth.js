module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in first!");
    res.redirect("/login");
  }
  next();
};
