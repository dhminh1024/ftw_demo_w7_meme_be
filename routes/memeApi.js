var express = require("express");
var router = express.Router();
const fileUpload = require("../helpers/upload.helper")("public/images/");
const uploader = fileUpload.uploader;
const photoHelper = require("../helpers/photo.helper");

/**
 * @route GET api/memes
 * @description Get all memes
 * @access Public
 */
router.get("/", function (req, res, next) {
  res.send({ status: "ok", data: "Get all memes" });
});

/**
 * @route POST api/memes
 * @description Create a new meme
 * @access Public
 */
router.post("/", uploader.single("image"), photoHelper.resize, function (
  req,
  res,
  next
) {
  console.log(req.file);
  res.send({ status: "ok" });
});

module.exports = router;
