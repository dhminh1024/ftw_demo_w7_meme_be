var express = require("express");
var router = express.Router();

// All route of Meme
const memeRoutes = require("./memeApi");
router.use("/memes", memeRoutes);

module.exports = router;
