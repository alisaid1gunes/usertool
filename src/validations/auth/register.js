const Joi = require('joi-oid');

const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

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
    location: Joi.object({
      type: pointSchema,
      name: Joi.string(),
      coordinates: Joi.array(),
    }).required(),
    about: Joi.string().required(),
    balance: Joi.number().required(),
    phoneNumber: Joi.string().required(),
  });
  return userSchema.validate(data);
};
module.exports = register;
