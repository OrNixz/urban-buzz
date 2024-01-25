const ejsMate = require("ejs-mate");
const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const Joi = require("joi");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Models
const Place = require("./models/place");
const Review = require("./models/review");

// Schemas
const { placeSchema } = require("./schemas/place");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1/urbanbuzz")
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Global Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Validate Place Middleware
const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    return next(new ErrorHandler(message, 400));
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/places",
  wrapAsync(async (req, res) => {
    const places = await Place.find();
    res.render("places/index", { places });
  })
);

app.get("/places/create", (req, res) => {
  res.render("places/create");
});

app.post(
  "/places",
  validatePlace,
  wrapAsync(async (req, res, next) => {
    const place = new Place(req.body.place);
    await place.save();
    res.redirect("/places");
  })
);

app.get(
  "/places/:id",
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/show", { place });
  })
);

app.get(
  "/places/:id/edit",
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/edit", { place });
  })
);

app.put(
  "/places/:id",
  validatePlace,
  wrapAsync(async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    res.redirect("/places");
  })
);

app.delete(
  "/places/:id",
  wrapAsync(async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect("/places");
  })
);

app.post(
  "/places/:id/reviews",
  wrapAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const place = await Place.findById(req.params.id);
    place.reviews.push(review);
    await review.save();
    await place.save();
    res.redirect(`/places/${req.params.id}`);
  })
);

// 404 Error Handling
app.all("*", (req, res, next) => {
  next(new ErrorHandler("Page Not Found", 404));
});

// Error Handling
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log(`Server is running on http://127.0.0.1:3000`);
});
