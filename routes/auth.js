const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

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
      res.redirect("/places");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/register");
    }
  })
);

module.exports = router;
