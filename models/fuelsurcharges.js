var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var fuelsurchargesSchema = mongoose.Schema({
	FromPrice: Number,
    ToPrice: Number,
    FuelSurcharge: Number,
    Status: Boolean,
	LastUpdate: {type: Date, default: Date.now}
});
module.exports  = mongoose.model('fuelsurchargesData',fuelsurchargesSchema, 'fuelsurcharges');