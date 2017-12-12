const models = require('../models/');
const {
  User,
  Secret,
  Request,
  Permission
 } = models;


// ----------------------------------------
// Seeds
// ----------------------------------------
const seeds = () => {

  // ----------------------------------------
  // Users
  // ----------------------------------------
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
  // Secret
  // ----------------------------------------
  console.log('Creating Secrets');
  const secrets = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    for (let j = 0; j < 5; j++) {
      const secret = new Secret({
        body: `Secret ${ j } - ${ user.email }`,
        user: user
      });
      user.secrets.push(secret);
      secrets.push(secret);
    }
  }


  // ----------------------------------------
  // Requests
  // ----------------------------------------
  console.log('Creating Requests');
  const requests = [];
  var secret = secrets[1];
  var user = users[0];
  const request = new Request({
    secret: secret,
    user: user
  });
  secret.requests.push(request);
  user.requests.push(request);
  requests.push(request);


  // ----------------------------------------
  // Permissions
  // ----------------------------------------
  console.log('Creating Permissions');
  const permissions = [];
  const permission = new Permission({
    secret: secrets[2],
    user: users[0]
  });
  secret.permissions.push(permission);
  user.permissions.push(permission);
  permissions.push(permission);


  // ----------------------------------------
  // Save Models
  // ----------------------------------------
  const promises = [];
  const collections = [
    // Arrays of model instances here
    users,
    secrets,
    requests,
    permissions
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
