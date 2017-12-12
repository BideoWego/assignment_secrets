const mongoose = require("mongoose");
const { Schema } = mongoose;


const RequestSchema = Schema({
  secret: {
    type: Schema.Types.ObjectId,
    ref: "Secret"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});


const Request = mongoose.model("Request", RequestSchema);


module.exports = Request;
