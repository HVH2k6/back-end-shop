const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/category.controller");
router.get("/",controller.index)
router.get("/add", controller.create);
router.post("/add", controller.createCategory);
router.get("/edit/:id", controller.edit);
router.post("/edit/:id", controller.editCategory);

module.exports = router