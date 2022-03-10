const Joi = require('joi-oid');





const register = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(10).required(),
    image: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    age: Joi.number().required(),
    bornAt: Joi.date().required(),
    location: Joi.array().items(Joi.number()).required(),
    about: Joi.string().required(),
    balance: Joi.number().required(),
    phoneNumber: Joi.string().required(),
  });
  return userSchema.validate(data);
};
module.exports = register;
