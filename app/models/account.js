var mongoose=require('mongoose');
autoIncrement = require('mongoose-auto-increment');
var accountSchema=mongoose.Schema({
	userid:{type:Number},
	ammount:{type:Number},
	status:{type:Boolean}
});

accountSchema.plugin(autoIncrement.plugin, { 
  model: 'account', 
  field: 'accountId', 
  startAt: 100,
  incrementBy: 1,
  unique:true});
var Account=module.exports=mongoose.model('Account',accountSchema);