angular.module('bankApp',['appRoutes','userController','userServices','authService','loginController'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});