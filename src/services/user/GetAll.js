const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { getAllValidation } = require('../../validations/user');
class GetAll {
  constructor() {
    this.mongooseTask = new MongooseService(User);
  }

  async GetUser() {
    const { error } = getAllValidation(id);
    if (error) return { success: false, error: error.details[0].message };
    
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
