const express = require("express");
const router = express.Router();
const productCont = require("../controllers/Products");

router.get("/:id", (req, res, next) => {
  productCont
    .getProduct(req.params.id ? req.params.id : null)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;
