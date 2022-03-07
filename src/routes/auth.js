const router = require('express').Router();

const { upload } = require('../utils');

const authController = require('../controllers/auth');

router.post('/register', upload.single('profile'), authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;
