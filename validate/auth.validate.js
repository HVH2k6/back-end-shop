const Auth = require('../module/auth-module');

const createAuthValidate = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  if (!fullname) {
    req.flash('error', 'Họ tên không được để trống');
    return res.redirect('back');
  }
  
  if (!email) {
    req.flash('error', 'Email không được để trống');
    return res.redirect('back');
  }
  
  if (!password) {
    req.flash('error', 'Mật khẩu không được để trống');
    return res.redirect('back');
  }
  
  if (password.length < 7) {
    req.flash('error', 'Mật khẩu phải lớn hơn hoặc bằng 7 ký tự');
    return res.redirect('back');
  }

  next();
};

module.exports = {
  createAuthValidate,
};
