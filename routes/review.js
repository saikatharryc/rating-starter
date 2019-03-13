const express = require("express");
const router = express.Router();
const reviewCont = require("../controllers/Reviews");
/*
 * Post a review for a product
 */
router.post("/", (req, res, next) => {
  reviewCont
    .postReview({ ...req.body, userId: req.user._id })
    .then(data => {
      return res.json(data);
    })
    .catch(error => {
      return next(error);
    });
});

/*
 * get product reviews
 */
router.get("/productId/:id", (req, res, next) => {
  if (!req.params.id) {
    return next({ status: 400, message: "invalid product id" });
  }

  reviewCont
    .getReviewFiltered("productId", req.params.id)
    .then(data => {
      return res.json(data);
    })
    .catch(error => {
      return next(error);
    });
});

/*
 * get product reviews
 */
router.get("/", (req, res, next) => {
  reviewCont
    .getReviewFiltered("userId", req.user._id)
    .then(data => {
      return res.json(data);
    })
    .catch(error => {
      return next(error);
    });
});
module.exports = router;
