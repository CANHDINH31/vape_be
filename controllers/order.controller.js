const orderModel = require("../models/order.model");

module.exports = {
  create: async (req, res) => {
    try {
      const data = await orderModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
};
