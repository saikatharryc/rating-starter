const Products = require("../models/Products");
const Reviews = require("../models/Reviews");

const saveReview = reviewPayload => {
  const savableReview = new Reviews(reviewPayload);
  savableReview.save((err, updated) => {
    if (err) {
      return Promise.reject({ status: 500, message: "Some error occured" });
    }
    return updateRating(reviewPayload.productId, reviewPayload.rating);
  });
};

const updateRating = async (productId, rating) => {
  const prevProduct = await Products.findOne({ _id: productId }).exec();
  if (!prevProduct) {
    return Promise.reject({ status: 404, message: "no product found" });
  }
  const newAverage =
    (prevProduct.avgRating * prevProduct.noOfReviews + rating) /
    (prevProduct.noOfReviews + 1);
  return await Products.update(
    { _id: productId },
    { $set: { avgRating: newAverage }, $inc: { noOfReviews: 1 } }
  ).exec();
};

const postReview = reviewPayload => {
  return Reviews.findOne({
    userId: reviewPayload.userId,
    productId: reviewPayload.productId
  })
    .then(data => {
      if (!data) {
        return saveReview(reviewPayload);
      } else {
        return Promise.reject({ status: 400, message: "already reviewed" });
      }
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const getReviewFiltered = (key, value) => {
  return Reviews.find({ [key]: value }).exec();
};

module.exports = {
  postReview,
  getReviewFiltered
};
