const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
