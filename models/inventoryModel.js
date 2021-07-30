const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const inventorySchema = new mongoose.Schema({
    username: {type:String},
    load_no:{type:String,required:true},
    ipin:{type:String,required:true},
    opin:{type:String,required:true},
    location:{type:String,required:true},
    inventory_id:{type:String,required:true},
    upc: { type: String, required: true },
    title: {type: String},
    unit_retail: {type: String},
    cost_price: {type: String},
    image: {type: String},
    condition: {type:String},
    quantity: {type: String},
    discount: {type:String},
    ext_retail: {type:String},
    sale_price: {type:String},
    retailer: {type:String}
},{ timestamps: true });

module.exports = InventoryItems = mongoose.model("inventoryItems", inventorySchema);






// So Model.find() returns an instance of the Query class. 
// You can chain find() calls to add additional query operators, 
// also known as filters, to the query. For example, both of 
// the following queries will find all customers whose email 
// contains 'foo.bar' and whose age is at least 30.

// // First parameter to `find()` is an object that contains query operators, see:
// // https://docs.mongodb.com/manual/reference/operator/query/
// Customer.find({ email: /foo\.bar/, age: { $gte: 30 } });
// // Equivalent:
// Customer.find({ email: /foo\.bar/ }).find({ age: { $gte: 30 } });


// The sort(), limit(), and skip() helpers modify 
//the query's options. For example, query.getOptions() 
//below will return an object that contains sort and limit properties.

// const query = Customer.find().sort({ name: 1 }).limit(1);
// query.getOptions(); // { sort: { name: 1 }, limit: 1 }