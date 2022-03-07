const fs = require('fs');

const { promisify } = require('util');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

class Update {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async UpdateUser(req, id) {
    const { body } = req;

    const { file } = req;

    if (file) {
      const fileUrl = req.file.path.replace(/\\/g, '/');
      body.image = fileUrl;
    }

    const user = await this.mongooseUser.get({ _id: id });

    if (user) await unlinkAsync(user.image);

    try {
      const result = await this.mongooseUser.update(id, body);

      if (result) return { result, success: true };
      return { success: false, error: 'Could not update.' };
    } catch (err) {
      return { success: false, error: `Could not update. Error:${err}` };
    }
  }
}
module.exports = Update;
