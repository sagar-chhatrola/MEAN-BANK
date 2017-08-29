var User=require('../models/user');
var jwt=require('jsonwebtoken');
var secret="sagarchhatrola";
var express=require('express');

module.exports=function (router) {
	
	router.post('/user',function(req,res){

  // set up goes here ...
      var user=new User();
     user.username=req.body.username;
     user.email=req.body.email;
     user.mobile=req.body.mobile;
     user.password=req.body.password;
    
     user.registerUser(user,function(err,user){
       if(err)
      	 {
 			res.json({success:false,message:"mobile or email already exist"});
      	 }
       else
      	 {	
            res.json({success:true,message:"Registration successfull"});
       	 }
     });

	});

     router.post('/authenticate',function(req,res){
      User.findOne({email:req.body.email}).select('username email password userid mobile').exec(function(err,user){
      	if(err){
      		throw err;
      	}
      	else if(!user){
      		res.json({success:false,message:"user is not exist"});
      	}
      	else if(user){
      		if(req.body.password){
      			var validatePassword=user.comparePassword(req.body.password);
      		}
      		else{
      			res.json({success:false,message:"No password provided"});
      		}
      		
      		if(validatePassword){
            req.session.user=user;
      			var token=jwt.sign({username:user.username,email:user.email},secret,{expiresIn:'24h'});
      			res.json({success:true,message:"Successfully Login!!",token:token});
      		}
      		else
      		{ 
      			res.json({success:false,message:"incorrect password"});
      		}
      	}

      });
	});

     router.get('/profile',function(req,res){
      if(!req.session.user){
       return res.status(401).json({success:false,message:"please login first.."});
      }
     return res.status(200).json({success:true,data:req.session.user});
     });

     router.post('/logout',function(req,res){

      if(req.session.user){
        req.session.user=null;
      }
     });

    router.post('/updateProfile',function(req,res){
      var user=new User();
      var user1=req.body;
      user.updateProfile(user1,function(err,user){
        if(err){
          throw err;
        }
        else{
         //console.log(user);
          req.session.user=user1;
          res.json({success:true,data:user1});
        }
      });

    });

   router.use(function(req,res,next){
     	var token=req.body.token || req.body.query || req.headers['x-access-token'];
     	if(token){
     		jwt.verify(token,secret,function(err,decoded){
     			if(err){
     				res.json({success:false,message:"token Invalid!"});
     			}
     			else{
     				req.decoded=decoded;
     				next();
     			}
     		});
     	}
     	else
     	{
     		res.json({success:false,emessage:"No token provided"});
     	}
     });


     router.post("/me",function(req,res){
     	res.send(req.decoded);
     });


	return router;
}