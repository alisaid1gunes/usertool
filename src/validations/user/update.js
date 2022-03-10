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

const update = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(10),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(10),
    image: Joi.string(),
    name: Joi.string(),
    surname: Joi.string(),
    age: Joi.number(),
    bornAt: Joi.date(),
    location: Joi.object({
      type: pointSchema,
      name: Joi.string(),
      coordinates: Joi.array(),
    }),
    about: Joi.string(),
    balance: Joi.number(),
    phoneNumber: Joi.string(),
  });
  return userSchema.validate(data);
};

module.exports = update;
