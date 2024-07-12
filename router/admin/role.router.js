const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/role.controller");

router.get("/", controller.index);

router.get("/add", controller.create);

router.post("/add", controller.createRole);
router.get("/permission", controller.permission);

router.get("/edit/:id", controller.edit);
router.post("/edit/:id", controller.update);
router.post("/permission", controller.createPermission);
module.exports = router