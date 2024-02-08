const multer = require("multer");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("images/")) {
      cb(null, true);
    } else {
      cb(new ErrorHandler("Not an image! Please upload an image.", 405));
    }
  },
});
