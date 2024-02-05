// Model
const User = require("../models/user");

module.exports.registerForm = (req, res) => {
  res.render("auth/register");
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "You are now registered and logged in!");
      res.redirect("/places");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("auth/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "You are now logged in!");
  res.redirect("/places");
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are now logged out!");
    res.redirect("/login");
  });
};
