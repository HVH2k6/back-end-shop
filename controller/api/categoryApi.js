const Category = require('../../module/category-module');
const createTree = require('../../helper/createTree');

const getAll = async (req, res) => {
    const categories = await Category.find({});
    const newCategories = createTree.tree(categories);
    res.json(categories);    
}
module.exports = { getAll }