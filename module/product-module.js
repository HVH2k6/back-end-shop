const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  sale: Number,
  quantity: Number,
  description: String,
  product_category: {
    type: String,
    default: '',
  },
  name_category: {
    type: String,
    default: '',
  },
  brand: {
    type: String,
    default: '',
  },

  slug: {
    type: String,
    slug: 'name',
    unique: true,
  },

  created_by: {
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
});

const Product = mongoose.model('Product', ProductSchema, 'products');

module.exports = Product;
