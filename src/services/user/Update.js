const fs = require('fs');

const { promisify } = require('util');

const { User } = require('../../models');

const { updateValidation, idValidation } = require('../../validations/user');

const MongooseService = require('../Mongoose');

class Update {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async UpdateUser(req, id) {
    const { body } = req;

    const { file } = req;

    const { idError } = idValidation(id);
    if (idError) return { success: false, message: idError.details[0].message };

    const { updateError } = updateValidation(body);
    if (updateError)
      return { success: false, message: updateError.details[0].message };

    if (file) {
      const fileUrl = req.file.path.replace(/\\/g, '/');
      body.image = fileUrl;
    }

    const user = await this.mongooseUser.get({ _id: id });

    if (user) await unlinkAsync(user.image);

    try {
      const result = await this.mongooseUser.update(id, body);

      if (result) return { result, success: true, message: 'User successfully updated' };
      return { success: false, message: 'Could not update.' };
    } catch (err) {
      return { success: false, message: `Could not update. Error:${err}` };
    }
  }
}
module.exports = Update;
