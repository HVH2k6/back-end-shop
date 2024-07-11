const express = require("express");
const router = express.Router();
const controller = require("../../controller/api/categoryApi");

router.get("/", controller.getAll)
module.exports = router