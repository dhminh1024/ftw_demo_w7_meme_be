const Jimp = require("jimp");
const fs = require("fs");

const photoHelper = {};

photoHelper.resize = async (req, res, next) => {
  if (req.file) {
    try {
      const image = await Jimp.read(req.file.path);
      await image.scaleToFit(400, 400).write(req.file.path);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error("Image required"));
  }
};

module.exports = photoHelper;
