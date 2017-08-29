var app=angular.module('loginController',['authService']);

app.controller('loginController',function(Auth,$location,$timeout,$scope){
  var app=this;
 if(Auth.isLoggedIn())
 {
 	 Auth.getUser().then(function(response){
   	 app.username=response.data.username;
   	 app.email=response.data.email;
   	 app.loginUser=true;
   });
 }

   this.dologin=function(user){
     Auth.login(this.user).then(function(response){
     	app.errorMessage=false;
     	if(response.data.token){
     		getUser();
     		app.loginUser=true;
     		$timeout(function() {
     			$location.path('/profile');
     		}, 2000);
     	}
     	else{
     		app.errorMessage=response.data.message;
     	}
     	console.log(response.data);
     });
     function getUser(){
     Auth.getUser().then(function(response){
   	 app.username=response.data.username;
   });
   }
  };

  this.logout=function(){
  		Auth.logout();
      $scope.removeProfileData = function () {
            $scope.$broadcast('removeprofile', { message: "Hello" });
        };
  		app.loginUser=false;
  		$timeout(function(){
  			$location.path('/login');
  		},2000);
   };

});

app.controller('profileController',function(User,$http,$location,$scope,Auth){
    var app=this;
    $scope.profileUpdate=function(user1){
      console.log(this.user1);
      User.updateProfile(this.user1).then(function(response){
        if(response.data.success){
          var userd=response.data.data;
          $scope.user1=response.data.data;

          console.log("successfully updated profile");
          //console.log(app.user);
          console.log(response.data);
        }
      });
      
    };
     $scope.$on('removeprofile', function (event, args) {
            app="";
        });

     if(Auth.isLoggedIn())
     {
      User.getProfile().then(function(response){
       console.log(response.data);
        if(response.data.success){
          user=response.data.data;
          $scope.user1=user;
          app.errorMessage=false;
        }
        else
        {
            app.errorMessage=response.data.message;
            app.successMessage=false;
            $location.path("/login");
        }

      });

    }

    else{
     $location.path("/login"); 
    }
  
}); 