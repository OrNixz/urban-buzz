const AuthController = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/register", AuthController.registerForm);

router.post("/register", wrapAsync(AuthController.register));

router.get("/login", AuthController.loginForm);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: {
      type: "error",
      message: "Invalid username or password.",
    },
  }),
  AuthController.login
);

router.post("/logout", AuthController.logout);

module.exports = router;
