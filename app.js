const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Models
const Place = require("./models/place");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1/urbanbuzz")
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

// app.get("/seed/place", async (req, res) => {
//   const place = new Place({
//     title: "Machu Picchu",
//     price: "100",
//     description: "A beautiful place",
//     location: "Peru",
//   });

//   await place.save();
//   res.send(place);
// });

app.listen(3000, () => {
  console.log(`Server is running on http://127.0.0.1:3000`);
});
