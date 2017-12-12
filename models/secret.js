const mongoose = require("mongoose");
const { Schema } = mongoose;


const SecretSchema = Schema({
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: "Permission"
  }],
  requests: [{
    type: Schema.Types.ObjectId,
    ref: "Request"
  }]
});


const Secret = mongoose.model("Secret", SecretSchema);


module.exports = Secret;
