const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await productModel.find({}).sort({ createdAt: -1 });
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

      return res.status(201).json(data);
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
      const categories = await categoryModel.find();
      for (const category of categories) {
        const listProduct = category?.product?.toString()?.split(",");

        if (listProduct.includes(req.params.id)) {
          category.product = listProduct.filter((id) => id !== req.params.id);
          await category.save();
        }
      }
      res.status(201).json("Xóa product thành công");
    } catch (error) {
      throw error;
    }
  },
};
