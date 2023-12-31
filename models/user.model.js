const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    password: {
      type: String,
      require: true,
    },

    username: {
      type: String,
      require: true,
    },

    name: {
      type: String,
      require: true,
    },

    // 0: user 1: admin
    role: {
      type: Number,
      default: 0,
    },

    favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],

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

module.exports = mongoose.model("user", userSchema);
