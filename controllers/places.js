const ExpressError = require("../utils/ErrorHandler");
const { geometry } = require("../utils/hereMaps");
const fs = require("fs");

// Model
const Place = require("../models/place");

module.exports.index = async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
};

module.exports.create = (req, res) => {
  res.render("places/create");
};

module.exports.store = async (req, res, next) => {
  const images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));

  const geoData = await geometry(req.body.place.location);
  console.log(geoData);

  const place = new Place(req.body.place);
  place.author = req.user._id;
  place.images = images;
  place.geometry = geoData;

  await place.save();
  req.flash("success", "Successfully made a new place!");
  res.redirect("/places");
};

module.exports.show = async (req, res) => {
  const place = await Place.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("places/show", { place });
};

module.exports.edit = async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/edit", { place });
};

module.exports.update = async (req, res) => {
  const place = await Place.findByIdAndUpdate(req.params.id, {
    ...req.body.place,
  });

  if (req.files && req.files.length > 0) {
    place.images.forEach((image) => {
      fs.unlink(image.url, (err) => {
        new ExpressError(err);
      });
    });

    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    place.images = images;
    await place.save();
  }
  req.flash("success", "Successfully updated place!");
  res.redirect(`/places/${req.params.id}`);
};

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);

  if (place.images.length > 0) {
    place.images.forEach((image) => {
      fs.unlink(image.url, (err) => {
        new ExpressError(err);
      });
    });
  }

  await place.deleteOne();

  req.flash("success", "Successfully deleted place!");
  res.redirect("/places");
};

module.exports.destroyImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { images } = req.body;

    if (!images || images.length === 0) {
      req.flash("error", "Please select an image to delete!");
      return res.redirect(`/places/${id}/edit`);
    }

    images.forEach((image) => {
      fs.unlinkSync(image);
    });

    await Place.findByIdAndUpdate(id, {
      $pull: { images: { url: { $in: images } } },
    });

    req.flash("success", "Successfully deleted images!");
    return res.redirect(`/places/${id}/edit`)
    
  } catch (error) {
    req.flash("error", "Failed to delete images!");
    return res.redirect(`/places/${id}/edit`);
  }
};
