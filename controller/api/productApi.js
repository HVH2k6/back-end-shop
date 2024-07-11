const Product = require('../../module/product-module');
const getAll = async (req, res) => {
    const limit = parseInt(req.query.limitData) || 10;
    const products = await Product.find({}).limit(limit);
    res.json(products);
}
module.exports = { getAll }