var app=angular.module("appRoutes",["ngRoute"]);

app.config(function($routeProvider){
$routeProvider.when("/",{
   templateUrl:"./views/register.html"

}).when("/register",{
   templateUrl:"./views/register.html",
   controller:"registerController",
   controllerAs:"regCtrl"

}).when("/login",{

	templateUrl:"./views/login.html"

}).when("/profile",{
	templateUrl:"./views/profile.html",
	controller:"profileController",
	controllerAs:"profileCtrl"
}).when("/logout",{

	templateUrl:"./views/logout.html"
});

});

