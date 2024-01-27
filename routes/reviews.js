const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");

// Models
const Place = require("../models/place");
const Review = require("../models/review");

// Schema
const { reviewSchema } = require("../schemas/review");

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

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const place = await Place.findById(req.params.place_id);
    place.reviews.push(review);
    await review.save();
    await place.save();
    res.redirect(`/places/${req.params.place_id}`);
  })
);

router.delete(
  "/:review_id",
  wrapAsync(async (req, res) => {
    const { place_id, review_id } = req.params;
    await Place.findByIdAndUpdate(place_id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/places/${place_id}`);
  })
);

module.exports = router;
