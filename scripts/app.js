var app = angular.module('myApp', ['iso.directives']);
app.controller('dashboardCntrl', function($scope,$http) {
 

 

  $scope.init = function(){
     $http.get("https://api.myjson.com/bins/wbsmn")
        .then(function(response) {
            $scope.ajbs = response.data.ajbs;
        });
  }

  $scope.tileBg = function(ajb){
    var speedStatus = ajb.last_spd_status[0].spd_status;
    console.log(ajb.last_spd_status[0].spd_status);
    if(speedStatus === "OK"){
        return "active";
    }else{
        return "error"   
    }
  }
    // Function called on page intialize
    $scope.init();
});