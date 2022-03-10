const router = require('express').Router();

const userController = require('../controllers/user');

const verify = require('../middlewares/verifyToken');

const { uploadProfile } = require('../utils');

router.get('/profile', verify, userController.getProfilePic);

router.get('/', verify, userController.getAll);

router.get('/:id', verify, userController.get);

router.delete('/:id', verify, userController.remove);

router.put(
  '/:id',
  verify,
  uploadProfile.single('profile'),
  userController.update
);

module.exports = router;
