var MongoClient=require('mongodb').MongoClient;
  

// Build the connection string 

// If the Node process ends, close the Mongoose connection 

module.exports.DBConnect=function(){
    
    var db = MongoClient.connect('mongodb://127.0.0.1:27017/Bank',function(err, db1) {
    if(err){
        throw err;
    }
    else{
    	console.log("connect");
    	return db1;
    }
    
    return db1;
   // myCollection = db.collection('test_collection');
});

}