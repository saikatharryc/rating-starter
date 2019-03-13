const express = require("express");
const router = express.Router();
const reviewCont = require("../controllers/Reviews");
/*
 * Post a review for a product
 */
router.post("/", (req, res, next) => {
  reviewCont
    .postReview(req.body)
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
router.get("/:type/:id", (req, res, next) => {
  const types = ["productId", "userId"];
  if (!req.params.type || types.indexOf(req.param.type) == -1) {
    return next({ status: 400, message: "invalid type" });
  }

  if (!req.params.id) {
    return next({ status: 400, message: "invalid " + req.params.type });
  }
  let id = "";
  if (req.params.type == "userId") {
    id = req.user._id;
  } else {
    id = req.params.id;
  }
  reviewCont
    .getReviewFiltered(req.params.type, id)
    .then(data => {
      return res.json(data);
    })
    .catch(error => {
      return next(error);
    });
});
module.exports = router;
