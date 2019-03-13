const express = require("express");
const router = express.Router();
const productCont = require("../../controllers/Products");

router.post("/", (req, res, next) => {
  productCont
    .createProduct(req.body)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return next(err);
    });
});

/*
 *  May be implement some more features here,otherwise it will be same as the user route
 */
router.get("/:id", (req, res, next) => {
  productCont
    .getProduct(req.params.id != "all" ? req.params.id : null)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return next(err);
    });
});
module.exports = router;
