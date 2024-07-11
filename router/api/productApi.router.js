const express = require("express");
const router = express.Router();
const controller = require("../../controller/api/productApi");

router.get("/", controller.getAll)
module.exports = router