var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var TruckTypeSchema = mongoose.Schema({
	TruckType: String,
    Units: Number,
    Capacity: Number,
    Status: Boolean,
	LastUpdate: {type: Date, default: Date.now}
});
module.exports  = mongoose.model('TruckTypeData',TruckTypeSchema, 'TruckType');