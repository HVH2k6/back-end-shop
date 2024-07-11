const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// Define the schema

const AuthSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  access_token: String,
  refresh_token: String,
  avatar: {
    type: String,
    default:
      'https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  role_id: String,
  name_role: String,
  phone_number: String,
  description: String,
  created_by: {
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
});

const Auth = mongoose.model('Auth', AuthSchema, 'auth');

module.exports = Auth;
