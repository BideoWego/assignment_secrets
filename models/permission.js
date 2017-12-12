const mongoose = require("mongoose");
const { Schema } = mongoose;


const PermissionSchema = Schema({
  secret: {
    type: Schema.Types.ObjectId,
    ref: "Secret"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});


const Permission = mongoose.model("Permission", PermissionSchema);


module.exports = Permission;
