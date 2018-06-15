var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var vendorSchema = mongoose.Schema({
    VendorName: String,
    ProductType: String,   
    IsActive: Boolean,
	LastUpdate: {type: Date, default: Date.now}
});
module.exports  = mongoose.model('vendorData',vendorSchema, 'vendor');