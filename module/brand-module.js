const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// Define the schema

const BrandSchema = new mongoose.Schema({
  title: String,

  slug: {
    type: String,
    slug: 'title',
    unique: true,
  },

  created_by: {
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
});

const Brand = mongoose.model('Brand', BrandSchema, 'brands');

module.exports = Brand;
