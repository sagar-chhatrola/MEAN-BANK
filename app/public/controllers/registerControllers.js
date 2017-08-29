angular.module('userController',['userServices'])
.controller('registerController',function(User){
    var app=this;
	this.regUser=function(user){
      console.log("inside regUser");
      console.log(this.user);
      User.create(this.user).then(function(response){
        app.errorMessage=false;
        if(response.data.success){
        	app.successMessage=response.data.message;
 			app.errorMessage=false;
        }
        else
        {
            app.errorMessage=response.data.message;
            app.successMessage=false;
        }

      });
	};
}); 