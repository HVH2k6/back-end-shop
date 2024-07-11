const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/auth.controller");
const authValidate = require("../../validate/auth.validate");
router.get("/login", controller.login)
router.post("/login", controller.loginAuth);
router.get("/register", controller.register);
router.post("/register", authValidate.createAuthValidate,controller.registerAuth);
router.get("/profile/:id", controller.profile);

module.exports = router