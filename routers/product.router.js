const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deleteProduct,
} = require("../controllers/product.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));
router.route("/:id").delete(asyncMiddelware(deleteProduct));

module.exports = router;
