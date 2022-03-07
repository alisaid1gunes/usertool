/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

class Register {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async RegisterUser(req) {
    const bodyIn = req.body;
    const { file } = req;

    if (!file)
      return {
        error: ' File type must be jpg or png and file size must less than 5MB',
        success: false,
      };

    const emailExist = await this.mongooseUser.get({ email: bodyIn.email });

    if (emailExist) return { error: 'email already exists', success: false };

    const salt = await bcrypt.genSalt(10);
    bodyIn.password = await bcrypt.hash(bodyIn.password, salt);

    const fileUrl = req.file.path.replace(/\\/g, '/');

    bodyIn.image = fileUrl;

    try {
      const user = await this.mongooseUser.save(bodyIn);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = { Register, registerEmitter };
