var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var RolesSchema = mongoose.Schema({
	RoleName: String,
    Permission: Number,
    IsActive: Boolean,
	LastUpdate: {type: Date, default: Date.now}
});
module.exports = mongoose.model('RolesData', RolesSchema, 'Roles');