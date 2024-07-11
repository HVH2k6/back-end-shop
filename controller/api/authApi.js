const Auth = require('../../module/auth-module');
const bcrypt = require('bcryptjs');
const jwtToken = require('../../middleware/token.middleware');
const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const data = await Auth.create({
      fullname,
      email,
      password: passwordHash,
      name_role: 'user',
    });
    res.json(data);
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).send({
      message: 'Internal server error',
    });
  }
}
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await Auth.findOne({ email });

    if (!data) {
      return res.status(400).send({
        message: 'email hoặc mật khẩu không đúng',
      });
    }

    const passwordMatch = await bcrypt.compare(password, data.password);

    if (passwordMatch) {
      
      const user={
        _id:data._id,
        email:data.email,
        fullname:data.fullname,
        avatar:data.avatar
      }
      const token = await jwtToken.accessToken(
        user,
       );
      res.json({
        token,
        message: 'Success',
        data: user,
      });
    } else {
      return res.status(400).send({
        message: 'email hoặc mật khẩu không đúng',
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send({
      message: 'Internal server error',
    });
  }
};



const getUser = async (req, res) => {
  res.json(req.user)
  
}
module.exports = { register,login, getUser };
