app.controller("loginController",function ($scope,loginService,$localStorage,$location) {
    $scope.login = function (arg1) {
       // console.log("login controller arg1 "+arg1);
        loginService.authenticate(arg1).then(function (res) {
            if(res.login == "success"){
                $localStorage.login_details = res;
                $location.path("/home/about");
            }else{
                alert("Login failed !");
            }
        });
    };
});