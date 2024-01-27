const ejsMate = require("ejs-mate");
const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

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

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/places", require("./routes/places"));
app.use("/places/:place_id/reviews", require("./routes/reviews"));

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
