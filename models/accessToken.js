const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessTokenSchema = new Schema({
  email: { type: String, required: true, maxLength: 150 },
  access_token: { type: String, required: true}
});

module.exports = mongoose.model("AccessToken", AccessTokenSchema);