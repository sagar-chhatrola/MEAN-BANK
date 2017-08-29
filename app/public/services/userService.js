angular.module('userServices',[])
 .factory('User',function($http){
	var userFactory={};
	userFactory.create=function(user){
      return $http.post('/api/user',user);
	};

	userFactory.getProfile=function(){
		return $http.get('/api/profile');
	};

	userFactory.updateProfile=function(user){
		console.log(user);
		return $http.post('/api/updateProfile',user);
	}
	return userFactory;
});