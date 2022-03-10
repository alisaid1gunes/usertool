const mongoose = require('mongoose');

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
    type: [Number],
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
