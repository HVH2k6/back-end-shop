const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/role.controller");

router.get("/", controller.index);

router.get("/add", controller.create);

router.post("/add", controller.createRole);
router.get("/permission", controller.permission);
router.post("/permission", controller.createPermission);
module.exports = router