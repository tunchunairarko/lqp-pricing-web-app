const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const retailerSchema = new mongoose.Schema({
  retailer: {type: String, required: true, unique: true},
  username:{type: String},
},{ timestamps: true });

module.exports = Retailers = mongoose.model("retailers", retailerSchema);