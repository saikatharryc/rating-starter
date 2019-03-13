const express = require("express");
const router = express.Router();
const products = require("./Products");

router.use("/", products);

module.exports = router;
