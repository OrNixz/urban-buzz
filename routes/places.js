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

router.get("/", wrapAsync(PlaceController.index));

router.get("/create", isAuth, PlaceController.create);

router.post("/", isAuth, validatePlace, wrapAsync(PlaceController.store));

router.get("/:id", isValidObjectId("/places"), wrapAsync(PlaceController.show));

router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.edit)
);

router.put(
  "/:id",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  validatePlace,
  wrapAsync(PlaceController.update)
);

router.delete(
  "/:id",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.destroy)
);

module.exports = router;
