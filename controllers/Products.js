const Products = require("../models/Products");

const createProduct = async productPayload => {
  const savableDoc = new Products(productPayload);
  savableDoc.save((err, created) => {
    if (err) {
      return Promise.reject(new Error(err));
    }
    return created;
  });
};
const getProduct = async (id = null) => {
  let query = {};
  if (id) {
    query = { _id: id };
  }
  const productData = await Products.find(query).exec();
  return productData;
};

module.exports = { createProduct, getProduct };
