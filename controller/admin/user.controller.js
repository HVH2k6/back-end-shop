const Auth = require('../../module/auth-module');
const Role = require('../../module/role-module');

const index = async (req, res) => {
    const user = await Auth.find();
    res.render('user/index', { user: user });
}
const edit = async (req, res) => {
    const id = req.params.id;
    const user = await Auth.findOne({ _id: id });
    const role = await Role.find({});
    res.render('user/edit', { user: user , role: role});
}
const update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const {role_id} = data;
    const name_role = await Role.findOne({ _id: role_id });
    data.name_role = name_role.name_role;
    await Auth.findOneAndUpdate({ _id: id }, data);
    res.redirect('/admin/user');
}
module.exports = { index , edit, update }