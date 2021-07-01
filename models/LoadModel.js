const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const loadSchema = new mongoose.Schema({
  loadNo: { type: String, required: true, unique: true },
  retailer: {type: String},
  username:{type: String},
  pallets: [{type: String}] //ipins
},{ timestamps: true });

module.exports = TruckLoad = mongoose.model("truckload", loadSchema);