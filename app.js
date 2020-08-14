const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const utilsHelper = require("./helpers/utils.helper");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

/* Initialize Routes */
app.use("/api", indexRouter);

// catch 404 and forard to error handler
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.statusCode = 404;
  next(err);
});

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  if (err.statusCode === 404) {
    return utilsHelper.sendResponse(res, 404, false, null, err, null);
  } else {
    console.log("ERROR", err.message);
    return utilsHelper.sendResponse(res, 500, false, null, err, null);
  }
});

module.exports = app;
