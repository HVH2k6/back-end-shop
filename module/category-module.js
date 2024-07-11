const mongoose = require("mongoose");

const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
// Define the schema
const categoryProducSchema = new mongoose.Schema(
  {
    name_category: String,
    parent_id: {
      type: String,
      default: "",
    },
    icon:String,
    image_category: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: Date,

    slug: {
      type: String,
      slug: "name_category",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the model
const Category = mongoose.model("Category", categoryProducSchema, "category");

// Export the model
module.exports = Category;
