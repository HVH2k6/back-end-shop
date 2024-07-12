const express = require("express");
const router = express.Router();
router.get("*", (req, res) => {
    res.render("not-found", { title: "Page Not Found" });
});
module.exports = router