const Products = require("../models/Products");
const Reviews = require("../models/Reviews");

const saveReview = async reviewPayload => {
  const savableReview = new Reviews(reviewPayload);
  savableReview.save((err, created) => {
    if (err) {
      return Promise.reject(new Error(err));
    }
    return created;
  });
};

const updateRating = async (productId, rating) => {
  const prevProduct = await Products.findOne({ _id: productId }).exec();
  if (!prevProduct) {
    return Promise.reject("no product found");
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
  let promiseArr = [];
  promiseArr.push(saveReview(reviewPayload));
  promiseArr.push(updateRating(reviewPayload.productId, reviewPayload.rating));
  return Promise.all(promiseArr);
};

const getReviewFiltered = (key, value) => {
  return Products.find({ [key]: value }).exec();
};

module.exports = {
  postReview,
  getReviewFiltered
};
