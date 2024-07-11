const Category = require('../../module/category-module');
const Auth = require('../../module/auth-module');
const createTree = require('../../helper/createTree');
const index = async (req, res) => {
  const categories = await Category.find({});
  const newCategories = createTree.tree(categories);
  
  
  res.render('category/index', { categories: newCategories});
};
const createCategory = async (req, res) => {
  const data = req.body;
  const category = new Category(data);
  await category.save();
  req.flash('success', 'Tạo danh mục thành công');
  res.redirect('back');
};
const create = async (req, res) => {
  const categories = await Category.find({});
  const newCategories = createTree.tree(categories);
  res.render('category/add', { categories: newCategories });
};
const edit = async (req, res) => {
  const id = req.params.id;
  const categories = await Category.find({});
  const newCategories = createTree.tree(categories);
  res.render('category/edit', { 
    data: await Category.findOne({ _id: req.params.id }),
    category: newCategories
   });
};
const editCategory = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await Category.updateOne({ _id: id }, data);
  req.flash('success', 'Sửa danh mục thành công');
  res.redirect('/admin/category');
};
module.exports = {
  index,
  create,
  createCategory,
  edit,
  editCategory,
};
