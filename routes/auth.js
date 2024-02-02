const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  wrapAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      await User.register(user, password);
      req.flash("success", "You are now registered! Please login.");
      res.redirect("/login");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: {
      type: "error",
      message: "Invalid username or password.",
    },
  }), (req, res) => {
    req.flash("success", "You are now logged in!");
    res.redirect("/places");
  }
);

router.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) { 
      return next(err); 
    }
    req.flash("success", "You are now logged out!");
    res.redirect("/login");
  })
})

module.exports = router;
