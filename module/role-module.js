const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// Define the schema
const RoleSchema = new mongoose.Schema({
    name_role: String,
    role_id: String,
    permission: {
        type: Array,
        default: []
    },
    description: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})
const Role = mongoose.model('Role', RoleSchema, 'role');
module.exports = Role