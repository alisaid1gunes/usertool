const { User } = require('../../models');

const MongooseService = require('../Mongoose');

class GetAll {
  constructor() {
    this.mongooseTask = new MongooseService(User);
  }

  async GetUser(userId) {
    try {
      const result = await this.mongooseTask.getAll();

      if (result) {
        return { result, success: true };
      }

      return { success: false, error: 'There is no User' };
    } catch (err) {
      return { success: false, error: `Users could not find. Error:${err}` };
    }
  }
}
module.exports = GetAll;
