const jwt = require('jsonwebtoken');
const Auth = require('../module/auth-module');
const Role = require('../module/role-module');
const accessToken = (payload) => {
  const access_token = jwt.sign({ payload }, 'access_token', {
    expiresIn: '1d',
  });

  return access_token;
};
const refreshToken = (payload) => {
  const refresh_token = jwt.sign({ payload }, 'refresh_token', {
    expiresIn: '365d',
  });

  return refresh_token;
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/auth/login');
  }

  jwt.verify(token, 'access_token', async (err, payload) => {
    if (err) {
      return res.redirect('/auth/login');
    }

    req.user = payload.payload;

    const dataUser = await Auth.findOne({ _id: req.user });
    const role = await Role.findOne({ _id: dataUser.role_id });

    global.roleUser = role
    global.dataUser = dataUser;
    next();
  });
};

const checkTokenClient = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, 'access_token');
    if (payload) {
      req.user = payload.payload;
      
    } else {
      return res.status(401).send({ message: 'Please login again' });
    }

  }else{
    return res.status(401).send({ message: 'Please login again' });
  }
  next();
};
module.exports = { accessToken, refreshToken, verifyToken, checkTokenClient };
