const categoryModel = require("../models/category.model");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await categoryModel
        .find({})
        .sort({ createdAt: -1 })
        .populate("product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  listMenu: async (req, res) => {
    try {
      const data = await categoryModel
        .find({})
        .sort({ displayOrder: -1, createdAt: -1 })
        .limit(4);

      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  getById: async (req, res) => {
    try {
      const data = await categoryModel
        .findOne({ _id: req.params.id })
        .populate("product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const data = await categoryModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await categoryModel.findByIdAndUpdate(
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

  addProduct: async (req, res) => {
    try {
      const { listId } = req.body;

      const category = await categoryModel.findById(req.params.id);

      const newProductIds = listId.filter(
        (productId) => !category.product.includes(productId)
      );
      category.product = [...category.product, ...newProductIds];

      const updatedCategory = await category.save();

      res.status(201).json(updatedCategory);
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await categoryModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa category thành công");
    } catch (error) {
      throw error;
    }
  },
};
