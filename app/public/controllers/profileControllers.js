angular.module('profileController',['userServices'])
.controller('profileController',function(User,$http,$location){
    var app=this;
      User.getProfile().then(function(response){
       console.log(response.data);
        if(response.data.success){
        	user=response.data.data;
          app.username=user.username;
          app.email=user.email;
          app.userid=user.userid;
          app.mobile=user.mobile;
 			    app.errorMessage=false;
        }
        else
        {
            app.errorMessage=response.data.message;
            app.successMessage=false;
            $location.path("/login");
        }

      });
	
}); 