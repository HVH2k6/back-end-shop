const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/user.controller");

router.get("/", controller.index);
router.get("/edit/:id", controller.edit);
router.post("/edit/:id", controller.update);
module.exports = router