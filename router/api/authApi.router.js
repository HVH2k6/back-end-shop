const express = require('express');
const router = express.Router();
const controller = require('../../controller/api/authApi');
const authValidate = require('../../validate/authfe.validate');
const checkToken = require('../../middleware/token.middleware');
router.post('/register', authValidate.registerauth, controller.register);
router.post('/login', authValidate.loginauth, controller.login);

router.get('/get-user', checkToken.checkTokenClient, controller.getUser);
module.exports = router;
