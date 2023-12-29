const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deleteCategory,
} = require("../controllers/category.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/:id").delete(asyncMiddelware(deleteCategory));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
