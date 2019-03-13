const Products = require("../models/Products");

const createProduct = async (productPayload, userId) => {
  const savableDoc = new Products({ ...productPayload, addedBy: userId });
  return savableDoc.save();
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
