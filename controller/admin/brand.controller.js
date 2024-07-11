const Brand = require("../../module/brand-module");

module.exports.createBrand = async (req, res) => {
    const data = req.body;
    
    const brand = new Brand(data);
    await brand.save();
    res.send("ok")
    
}