const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const catalogschema = new mongoose.Schema({
  catalog: {type: String, required: true, unique: true},
  username:{type: String},
},{ timestamps: true });

module.exports = Catalogs = mongoose.model("catalogs", catalogschema);