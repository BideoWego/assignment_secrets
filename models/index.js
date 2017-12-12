const mongoose = require('mongoose');
const bluebird = require('bluebird');


mongoose.Promise = bluebird;


// Disable logging while testing and seeding
if (process.env.NODE_ENV !== 'test' &&
   !process.argv[process.argv.length - 1].match(/seed/)) {
  mongoose.set('debug', true);
}


const models = {};


// Require models here
models.User = require('./user');
models.Secret = require('./secret');
models.Request = require('./request');
models.Permission = require('./permission');


module.exports = models;
