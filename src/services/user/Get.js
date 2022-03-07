const { User } = require('../../models');

const MongooseService = require('../Mongoose');

class Get {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async GetUser(id) {
    try {
      const result = await this.mongooseUser.get({ _id: id });

      if (result) return { result, success: true };

      return { success: false, error: 'User could not find' };
    } catch (err) {
      return { success: false, error: `User could not find. Error:${err}` };
    }
  }
}
module.exports = Get;
