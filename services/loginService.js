app.service("loginService",function ($http) {
    this.authenticate = function (data) {
       // console.log("Login service data is "+data);
        return $http.post("http://localhost:8080/login",data).then(function (posRes) {
            return posRes.data;
        },function (errRes) {
            return errRes;
        });
    };
});