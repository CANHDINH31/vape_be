const productModel = require("../models/product.model");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await productModel.find({});
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const data = await productModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
};
