const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
},{ timestamps: true });

module.exports = User = mongoose.model("user", userSchema);