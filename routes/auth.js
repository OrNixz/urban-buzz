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
    res.send(req.body);
  })
);

module.exports = router;

// app.get("/register", async (req, res) => {
//   const user = new User({
//     email: "user@gmail.com",
//     username: "user",
//   });

//   const newUser = await User.register(user, "password");
//   res.send(newUser);
// });
