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

  update: async (req, res) => {
    try {
      const data = await productModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );

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

  deleteProduct: async (req, res) => {
    try {
      await productModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa product thành công");
    } catch (error) {
      throw error;
    }
  },
};
