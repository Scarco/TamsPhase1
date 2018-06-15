var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var ProductSchema = mongoose.Schema({
    ProductName: String,
    ProductType: String,
    Units: Number,   
    Status: Boolean,
	LastUpdate: {type: Date, default: Date.now}
});
module.exports  = mongoose.model('ProductData',ProductSchema, 'Product');