const express = require("express");
const router = express.Router();

const { create, list } = require("../controllers/category.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/").post(asyncMiddelware(create));
router.route("/").post(asyncMiddelware(list));

module.exports = router;
