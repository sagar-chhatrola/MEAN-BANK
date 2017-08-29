var mongoose=require('mongoose');
var mongodb=require('mongodb');
var bcrypt=require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/Bank');
var db=mongoose.connection;
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var ObjectId=mongodb.ObjectID;
var Account=require('./account');
var userSchema=mongoose.Schema({
	//userid:{type:mongoose.Schema.Types.Number,index:true,ref:'user',unique:true},
	username:{type:String,index:true},
	email:{type:String,unique: true},
	mobile:{type:String,unique: true},
	password:{type:String}
});

userSchema.plugin(autoIncrement.plugin, { 
  model: 'user', 
  field: 'userid', 
  startAt: 1000,
  incrementBy: 1,
  unique:true});
User1=db.model('user',userSchema);

userSchema.methods.registerUser=function(newUser,callback) {
	 var salt = bcrypt.genSaltSync(10);
     var hash = bcrypt.hashSync(newUser.password, salt);
     newUser.password=hash;
     newUser.nextCount(function(err,count){
     newUser.save(function(err,user){
     	if(err){
     		callback(err,null);
     	}
     	else{
     	  	newUser.nextCount(function(err,count){
          console.log(newUser);
          var account=new Account();
          account.ammount=1000;
          account.status=false;
          account.userid=newUser.userid;
          account.save(function(err,acnt){
          if(err){
            callback(err,null);
          }
          else{
            account.nextCount(function(err,count){
            console.log(acnt);
            callback(null,acnt);
            });
          }

        });
     		});
     	}
     });
   });
};

userSchema.methods.updateProfile=function(user,callback){
  var userid=user.userid;
  var query={userid:userid};
  db.collection("users").findOneAndUpdate(query, { $set: { username:user.username,email:user.email,mobile:user.mobile}},{ new: true },function(err,updatedUser){
    if(err){
      callback(err,null);
    }
    else{
      //console.log(updatedUser.value);
      //console.log(JSON.stringify(updatedUser));
      callback(null,updatedUser.value);

    }
  });
};

userSchema.methods.comparePassword=function(password){
  	return bcrypt.compareSync(password,this.password);  
};

var User=module.exports=mongoose.model('User',userSchema);
module.exports.User1=User1;