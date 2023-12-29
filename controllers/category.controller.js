const categoryModel = require("../models/category.model");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await categoryModel.find({});
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

  deleteCategory: async (req, res) => {
    try {
      await categoryModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa category thành công");
    } catch (error) {
      throw error;
    }
  },
};
