
module.exports = {
  development: {
    database: "assignment_secrets_development",
    host: "localhost"
  },
  test: {
    database: "assignment_secrets_test",
    host: "localhost"
  },
  production: {
    use_env_variable: "MONGO_URL"
  }
};
