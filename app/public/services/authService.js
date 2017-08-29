angular.module('authService',[])
.factory('Auth',function($http,AuthToken,$q){
 
 var authFactory={};
   authFactory.login=function(user){
    return $http.post('/api/authenticate',user).then(function(response){
    	AuthToken.setToken(response.data.token);
    	return response;
    });
 };

   authFactory.isLoggedIn=function(){
   	if(AuthToken.getToken())
   	{	
   		console.log("inside isLoggedIn");
   		return true;
   	}
   	else
   	{
   		return false;
   	}
   };

   authFactory.getUser=function(){
   	if(AuthToken.getToken()){
   		return $http.post('/api/me');
   	}
   	else{
   		 $q.reject({message:'user has no token'});
   	}
   };

   authFactory.logout=function(){
    AuthToken.setToken();
    return $http.post('/api/logout');
   }

   return authFactory;

}).factory('AuthToken',function($window){

	var authTokenFactory={}
	authTokenFactory.setToken=function(token){
		if(token){
		$window.localStorage.setItem('token',token);
	   }
	    else{
	    	$window.localStorage.removeItem('token');
	    }
	}

	authTokenFactory.getToken=function(){
		return $window.localStorage.getItem('token');
	}


	
	return authTokenFactory;
}).factory('AuthInterceptors',function(AuthToken){
	var authInterceptorsFactory={};

    authInterceptorsFactory.request=function(config){
    	var token=AuthToken.getToken();
    	if(token){
    		config.headers['x-access-token']=token;
    	}
    	return config;
    };
	return authInterceptorsFactory;
});