const { User } = require('../../models');

const MongooseService = require('../Mongoose');

class GetAll {
  constructor() {
    this.mongooseTask = new MongooseService(User);
  }

  async GetUser() {
    try {
      const result = await this.mongooseTask.getAll();

      if (result) {
        return { result, success: true, message: 'Users successfully fetched' };
      }

      return { success: false, message: 'There is no User' };
    } catch (err) {
      return { success: false, message: `Users could not find. Error:${err}` };
    }
  }
}
module.exports = GetAll;
