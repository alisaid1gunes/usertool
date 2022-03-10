const fs = require('fs');

const { promisify } = require('util');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { removeValidation } = require('../../validations/user');

const unlinkAsync = promisify(fs.unlink);

class Remove {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async RemoveUser(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, error: error.details[0].message };
    
    const user = await this.mongooseUser.get({ _id: id });

    if (user) await unlinkAsync(user.image);

    try {
      await this.mongooseUser.delete({ _id: id });
      return { message: 'User removed', success: true };
    } catch (err) {
      return { success: false, error: `User could not remove. Error:${err}` };
    }
  }
}
module.exports = Remove;
