const models = require('../models/');
const { User } = models;


// ----------------------------------------
// Seeds
// ----------------------------------------
const seeds = () => {

  console.log('Creating Users');
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new User({
      email: `foobar${ i }@gmail.com`,
      password: "password"
    });
    users.push(user);
  }


  // ----------------------------------------
  // Save Models
  // ----------------------------------------
  const promises = [];
  const collections = [
    // Arrays of model instances here
    users
  ];

  collections.forEach(collection => {
    collection.forEach(model => {
      const promise = model.save();
      promises.push(promise);
    });
  });

  return Promise.all(promises);
};


// ----------------------------------------
// Run Seeds
// ----------------------------------------
const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/mongoose')[env];

let mongodbUrl = config.use_env_variable ?
  process.env[config.use_env_variable] :
  `mongodb://${ config.host }/${ config.database }`;


mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: seeds
});
