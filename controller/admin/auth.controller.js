const Auth = require('../../module/auth-module');
const bcrypt = require('bcryptjs');
const jwtToken = require('../../middleware/token.middleware');
const login = async (req, res) => {
  res.render('auth/login');
};
const loginAuth = async (req, res) => {
  const { email, password } = req.body;

  const data = await Auth.findOne({ email });
  const passwordMatch = await bcrypt.compare(password, data.password);
  if (email === data.email && passwordMatch) {
    const token = await jwtToken.accessToken(data._id);

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.redirect('/dashboard');
  }
};
const register = async (req, res) => {
  res.render('auth/register');
};
const registerAuth = async (req, res) => {
  const { fullname, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
   await Auth.create({
    fullname,
    email,
    password: hashPassword,
    name_role:"user"

  });

  res.redirect('/auth/login');
};
const profile = async (req, res) => {
  const id = req.params.id;
  const data = await Auth.findById(id);
  res.render('auth/profile', { data });
};

module.exports = { login, loginAuth, register, registerAuth, profile };
