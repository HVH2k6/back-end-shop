const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/brand.controller");

router.post("/add", controller.createBrand);

module.exports = router