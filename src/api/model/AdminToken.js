const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = Schema({
  token: {
    type: String,
    required: true,
  },

  _adminId: {
    type: Schema.Types.ObjectId,
    ref: "admin",
  },

  
});

const AdminToken = mongoose.model("token", tokenSchema);
module.exports = { AdminToken };