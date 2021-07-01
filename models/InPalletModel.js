const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false)

const palletSchema = new mongoose.Schema({
  ipin: { type: String, required: true, unique: true },
  location: {type: String},
  load_no: {type: String},
  username:{type: String},
  retailer: {type: String},
  cost_price: {type: String}
},{ timestamps: true });

module.exports = InPallets = mongoose.model("incoming_pallets", palletSchema);