const router = require('express').Router();

const { upload } = require('../utils');

const authController = require('../controllers/auth');

router.post('/register', upload.single('profile'), authController.register);

module.exports = router;
