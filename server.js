express=require('express');
app=express();
var session=require('express-session');
app.use(session({secret:"ashbabsadhjbchdj",resave:false,saveUninitialized:true}));

app.use(express.static(__dirname+'/app/public'));
 
var path=require('path');
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var router=express.Router();
appRoutes=require('./app/routes/api')(router);
app.use('/api',appRoutes);

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.listen(3000,function(){
	console.log("server started on port no 3000");
});