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
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 10,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    min: 8,
    max: 16,
  },
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  bornAt: {
    type: Date,
    require: true,
  },
  location: {
    name: String,
    type: pointSchema,
    required: true,
    index: '2dsphere',
  },
  about: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('User', userSchema);
