const express = require('express');

const helmet = require('helmet');

const compression = require('compression');

const cors = require('cors');

const apiErrorHandler = require('../middlewares');

const { auth } = require('../routers');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(compression({ threshold: 6 }));

  app.use(cors());

  app.use('/api', auth);

  app.use(apiErrorHandler);
};
