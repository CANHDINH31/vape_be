const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
    },

    number: {
      type: Number,
    },

    description: {
      type: String,
    },
    nameType: {
      type: String,
    },
    types: [
      {
        type: String,
      },
    ],

    url1: {
      type: String,
    },

    url2: {
      type: String,
    },

    url3: {
      type: String,
    },

    url4: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
