app.controller("contactController",function ($scope,homeService) {
    homeService.mongoDBData().then(function (res) {
       $scope.data = res;
   })
});