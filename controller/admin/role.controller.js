const Role = require("../../module/role-module");
const index = async (req, res) => {
    const roles = await Role.find();
    res.render("role/index", { roles: roles });
}
const create = async (req, res) => {
    res.render("role/add");
}
const createRole = async (req, res) => {
    const data = req.body;
    const role = new Role(data);
    await role.save();
    req.flash("success", "Thêm vai trò thành công");
    res.redirect("/admin/role");
    
}
const permission = async (req, res) => {
    const roleList = await Role.find();
    res.render("role/permission",{ relust: roleList });
}
const createPermission = async (req, res) => {
    const permission = JSON.parse(req.body.permission);
  
    for (const item of permission) {
      await Role.updateOne({ _id: item.id }, { permission: item.permissions });
    }
    res.redirect('/');
  };
module.exports = { index, create, createRole, permission, createPermission }