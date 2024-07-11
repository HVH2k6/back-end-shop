const registerauth = (req, res, next) => {
  if (!req.body.fullname) {
    return res.status(400).send({
      message: 'Họ tên không được để trống!',
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: 'Email can not be empty!',
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: 'Password can not be empty!',
    });
  }
  if (req.body.password.length < 6) {
    return res.status(400).send({
      message: 'Password must be at least 6 characters!',
    });
  }

  next();
};
const loginauth = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: 'Email can not be empty!',
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: 'Password can not be empty!',
    });
  }
  
  next();
};
module.exports = { loginauth, registerauth };
