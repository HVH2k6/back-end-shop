const dashboardRouter = require('./main.router');
const homeRouter = require('./home.router');
const productRouter = require('./admin/product.router');
const brandRouter = require('./admin/brand.router');
const categoryRouter = require('./admin/category.router');
const authRouter = require('./admin/auth.router');
const userRouter = require('./admin/user.router');
const roleRouter = require('./admin/role.router');
const pageNotFoundRouter = require('./notfound.router');
const tokenCheck = require('../middleware/token.middleware');
const checkRole = require('../middleware/role.middleware');
//api
const productApiRouter = require('./api/productApi.router');
const categoryApiRouter = require('./api/categoryApi.router');
const authApiRouter = require('./api/authApi.router');


module.exports = (app) => {
  app.use('/', homeRouter);
  app.use('/dashboard', tokenCheck.verifyToken, dashboardRouter);
  app.use('/admin/product', tokenCheck.verifyToken, checkRole.checkPermission,productRouter);
  app.use('/admin/brand', brandRouter);
  app.use('/admin/category', tokenCheck.verifyToken, categoryRouter);
  app.use('/admin/user', tokenCheck.verifyToken, userRouter);
  app.use('/admin/role', tokenCheck.verifyToken, roleRouter);
  app.use('/auth', authRouter);
  app.use('/*', pageNotFoundRouter);
  // api
  app.use('/api/product', productApiRouter);
  app.use('/api/category', categoryApiRouter);
  app.use('/api/auth', authApiRouter);
};
