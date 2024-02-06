const express = require("express");
const router = express.Router({ mergeParams: true });
const ReviewController = require("../controllers/reviews");
const wrapAsync = require("../utils/wrapAsync");

// Validate Review Middleware
const { validateReview } = require("../middlewares/validator");

// Middleware for checking if ID is valid
const isValidObjectId = require("../middlewares/isValidObjectId");

// Middleware for checking if user is authenticated
const isAuth = require("../middlewares/isAuth");

// Middleware for checking if user is author of review
const { isAuthorReview } = require("../middlewares/isAuthor");

router.post(
  "/",
  isValidObjectId("/places"),
  isAuth,
  validateReview,
  wrapAsync(ReviewController.store)
);

router.delete(
  "/:review_id",
  isAuth,
  isAuthorReview,
  isValidObjectId("/places"),
  wrapAsync(ReviewController.destroy)
);

module.exports = router;
