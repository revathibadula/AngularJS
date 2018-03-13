app.controller("portfolioController",function ($scope,homeService) {
   homeService.staticData().then(function (res) {
       $scope.data = res;
   });
});