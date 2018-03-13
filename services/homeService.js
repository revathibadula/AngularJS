app.service("homeService",function ($http,$localStorage) {

    this.token = $localStorage.login_details.token;
    this.mySQLData = function () {
      return $http.post("http://localhost:8080/mysql",{"token":this.token}).then(function (posRes) {
          return posRes.data;
      },function (errRes) {
          return errRes;
      });
    };

    this.mongoDBData = function () {
        return $http.post("http://localhost:8080/mongodb",{"token":this.token}).then(function (posRes) {
            return posRes.data;
        },function (errRes) {
            return errRes;
        });
    };

    this.staticData = function () {
        return $http.post("http://localhost:8080/static",{"token":this.token}).then(function (posRes) {
            return posRes.data.products;
        },function (errRes) {
            return errRes;
        });
    };
});