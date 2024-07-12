const Auth = require('../module/auth-module');
module.exports.index = async (req, res) => {
  
  res.render('index');
};
module.exports.test = async (req, res) => {
  res.send('hello world');
};
