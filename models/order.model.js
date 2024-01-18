const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    note: {
      type: String,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        amount: { type: Number },
        type: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
