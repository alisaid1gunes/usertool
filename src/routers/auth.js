const router = require('express').Router();

const { uploadProfile } = require('../utils');

const authController = require('../controllers/auth');

router.post(
  '/register',
  uploadProfile.single('profile'),
  authController.register
);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/refresh', authController.refresh);

module.exports = router;
