const ejsMate = require("ejs-mate");
const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const Joi = require("joi");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Models
const Review = require("./models/review");

// Schemas
const { reviewSchema } = require("./schemas/review");

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

// Validate Review Middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
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

app.use("/places", require("./routes/places"));

app.post(
  "/places/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const place = await Place.findById(req.params.id);
    place.reviews.push(review);
    await review.save();
    await place.save();
    res.redirect(`/places/${req.params.id}`);
  })
);

app.delete(
  "/places/:place_id/reviews/:review_id",
  wrapAsync(async (req, res) => {
    const { place_id, review_id } = req.params;
    await Place.findByIdAndUpdate(place_id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/places/${place_id}`);
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
