const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const PlaceController = require("../controllers/places");
const router = express.Router();
const upload = require("../config/multer");
const wrapAsync = require("../utils/wrapAsync");

// Validate Place Middleware
const { validatePlace } = require("../middlewares/validator");

// Middleware for checking if ID is valid
const isValidObjectId = require("../middlewares/isValidObjectId");

// Middleware for checking if user is authenticated
const isAuth = require("../middlewares/isAuth");

// Middleware for checking if user is author of place
const { isAuthorPlace } = require("../middlewares/isAuthor");

router
  .route("/")
  .get(wrapAsync(PlaceController.index))
  // .post(isAuth, validatePlace, wrapAsync(PlaceController.store));
  .post(isAuth, upload.array('image', 5), (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send("It worked!")
  })

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
