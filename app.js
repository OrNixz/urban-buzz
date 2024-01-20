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

// Middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/places", async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
});

app.get("/places/create", (req, res) => {
  res.render("places/create");
});

app.post("/places", async (req, res) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect("/places");
});

app.get("/places/:id", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/show", { place });
});

app.listen(3000, () => {
  console.log(`Server is running on http://127.0.0.1:3000`);
});
