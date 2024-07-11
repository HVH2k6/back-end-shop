const Brand = require('../../module/brand-module');
const Category = require('../../module/category-module');
const createTree = require('../../helper/createTree');
const Product = require('../../module/product-module');
const cloudinary = require('../../config/cloudinary');
const Auth = require('../../module/auth-module');
const index = async (req, res) => {
  const products = await Product.find({});
   
  res.render('product/index', {
    products: products,
    
  });
};
const create = async (req, res) => {
  const brand = await Brand.find({});
  const categories = await Category.find({});
  const newCategories = createTree.tree(categories);

  res.render('product/add', {
    categories: newCategories,
    brand: brand,
  });
};
const createProduct = async (req, res) => {
  const data = req.body;
  req.body.price = parseInt(req.body.price);
  req.body.sale = parseInt(req.body.sale);
  req.body.quantity = parseInt(req.body.quantity);
  //   if (req.body.position === '') {
  //     const countPosition = await Product.find().countDocuments();
  //     req.body.position = countPosition + 1;
  //   } else {
  //     req.body.position = parseInt(req.body.position); // Parse position only if it's not empty
  //   }
  const idCatergory = req.body.product_category;

  const name_category = await Category.findById(idCatergory).select(
    'name_category'
  );
  req.body.name_category = name_category.name_category;

  const product = new Product(data);
  await product.save();
  res.redirect('/admin/product');
};
const edit = async (req, res) => {
  const id = req.params.id;
  const brand = await Brand.find({});

  const product = await Product.findById(id);
  const categories = await Category.find({});
  const newCategories = createTree.tree(categories);

  res.render('product/edit', {
    product: product,
    categories: newCategories,
    brand: brand,
  });
};
const editProduct = async (req, res) => {
  const id = req.params.id;
  if (!req.file) {
    req.body.image = req.body.image;
  } else {
    const currentImage = await Product.findOne({ _id: id }).select('image');
    const getCurrentImage = currentImage.image;
    const regex = /(?<=\/)[\w]+(?=\.\w+$)/;
    if (getCurrentImage) {
      const imageName = getCurrentImage.match(regex);

      if (imageName) {
        const url = imageName[0];
        try {
          await cloudinary.api.delete_resources([url]);
          
          console.log('delete success');
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  req.body.price = parseInt(req.body.price);
  req.body.sale = parseInt(req.body.sale);
  req.body.quantity = parseInt(req.body.quantity);
  const data = req.body;
  await Product.updateOne({ _id: id }, data);
  res.redirect('/admin/product');
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  //   await Product.findByIdAndDelete(id);
  const currentImage = await Product.findOne({ _id: id }).select('image');
  const getCurrentImage = currentImage.image;
  const regex = /(?<=\/)[\w]+(?=\.\w+$)/;
  if (getCurrentImage) {
    const imageName = getCurrentImage.match(regex);

    if (imageName) {
      const url = imageName[0];
      try {
        await cloudinary.api.delete_resources([url]);
        await Product.deleteOne({ _id: id });
        res.redirect('back');
      } catch (error) {
        console.log(error);
      }
    }
  }
};
module.exports = {
  index,
  create,
  createProduct,
  edit,
  editProduct,
  deleteProduct,
};
