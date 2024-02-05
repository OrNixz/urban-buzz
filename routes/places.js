const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const PlaceController = require("../controllers/places");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

// Schema
const { placeSchema } = require("../schemas/place");

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

// Middleware for checking if ID is valid
const isValidObjectId = require("../middlewares/isValidObjectId");

// Middleware for checking if user is authenticated
const isAuth = require("../middlewares/isAuth");

// Middleware for checking if user is author of place
const { isAuthorPlace } = require("../middlewares/isAuthor");

router
  .route("/")
  .get(wrapAsync(PlaceController.index))
  .post(isAuth, validatePlace, wrapAsync(PlaceController.store));

router.get("/create", isAuth, PlaceController.create);

router
  .route("/:id")
  .get(isValidObjectId("/places"), wrapAsync(PlaceController.show))
  .put(
    isAuth,
    isAuthorPlace,
    isValidObjectId("/places"),
    validatePlace,
    wrapAsync(PlaceController.update)
  )
  .delete(
    isAuth,
    isAuthorPlace,
    isValidObjectId("/places"),
    wrapAsync(PlaceController.destroy)
  );

router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.edit)
);

module.exports = router;
