const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const palletSchema = new mongoose.Schema({
  opin: { type: String, required: true, unique: true },
  username:{type: String},
  catalog: {type: String},
  ipin: {type: String},
  sale_price: {type: String},
  items: [{type: String}]
},{ timestamps: true });

module.exports = OutPallets = mongoose.model("outgoing_pallets", palletSchema);