const repl = require('repl').start({});
const lodash = require('lodash');
const helpers = require('./helpers');
const mongoose = require('mongoose');
const models = require('./models');



require('./mongo')().then(() => {

  // ----------------------------------------
  // Libs
  // ----------------------------------------
  repl.context.lodash = lodash;


  // ----------------------------------------
  // Helpers
  // ----------------------------------------
  repl.context.helpers = helpers;
  Object.keys(helpers).forEach(key => {
    repl.context[key] = helpers[key];
  });


  // ----------------------------------------
  // Models
  // ----------------------------------------
  repl.context.models = models;
  Object.keys(models).forEach(modelName => {
    repl.context[modelName] = mongoose.model(modelName);
  });


  // ----------------------------------------
  // Logging
  // ----------------------------------------
  repl.context.lg = console.log;
});
