const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deleteProduct,
  update,
} = require("../controllers/product.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/:id").patch(asyncMiddelware(update));
router.route("/:id").delete(asyncMiddelware(deleteProduct));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
