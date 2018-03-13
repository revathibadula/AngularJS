app.controller("homeController",function ($scope,$localStorage,$location) {
   $scope.logout = function () {
     delete $localStorage.login_details;
     $location.path("/login");
   };
});