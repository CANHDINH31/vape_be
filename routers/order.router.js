const express = require("express");
const router = express.Router();

const { create } = require("../controllers/order.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/").post(asyncMiddelware(create));

module.exports = router;
