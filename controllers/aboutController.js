app.controller("aboutController",function ($scope,homeService) {
    homeService.mySQLData().then(function (res) {
        $scope.data = res;
    });
});