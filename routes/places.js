const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

// Model
const Place = require("../models/place");

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

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const places = await Place.find();
    res.render("places/index", { places });
  })
);

router.get("/create", (req, res) => {
  res.render("places/create");
});

router.post(
  "/",
  validatePlace,
  wrapAsync(async (req, res, next) => {
    const place = new Place(req.body.place);
    await place.save();
    req.flash("success", "Successfully made a new place!");
    res.redirect("/places");
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id).populate("reviews");
    res.render("places/show", { place });
  })
);

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/edit", { place });
  })
);

router.put(
  "/:id",
  validatePlace,
  wrapAsync(async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    req.flash("success", "Successfully updated place!");
    res.redirect(`/places/${req.params.id}`);
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    req.flash("success", "Successfully deleted place!");
    res.redirect("/places");
  })
);

module.exports = router;
