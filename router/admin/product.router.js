const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");
const uploadCloud = require('../../middleware/cloud.middleware');
const multer = require('multer');
const fileUpload = multer();
router.get("/", controller.index);
router.get("/add", controller.create);
router.post("/add",
 fileUpload.single('image'),
 uploadCloud.cloud,
 controller.createProduct);
router.get("/edit/:id", controller.edit);
router.post("/edit/:id",
 fileUpload.single('image'),
 uploadCloud.cloud,
 controller.editProduct);
// router.get("/delete/:id", controller.deleteProduct);
router.delete("/delete/:id", controller.deleteProduct);

module.exports = router