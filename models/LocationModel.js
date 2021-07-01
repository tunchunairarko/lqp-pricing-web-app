const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const locationSchema = new mongoose.Schema({
  locationNo: { type: String, required: true, unique: true },
  username:{type: String},
  pallets: [{
      ipin:{type:String},
      loadNo:{type:String}
  }]
},{ timestamps: true });

module.exports = PalletLocation = mongoose.model("pallet_location", locationSchema);