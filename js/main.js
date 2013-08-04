function MainCtrl($scope) {
  /*io.configure(function() {
   io.set("transports", ["xhr-polling"]);
   io.set("polling duration", 10);
   });
   io.connect();*/
  $scope.state = {
    loggedin : false,
    selectedclass : 0, //-1
    selectedassignment : -1,
    menuvisible : false
  };
  $scope.user = {
    username : "",
    password : "",
    data : [{
      name : "Calculus",
      assignments : [{
        name : "4-3 Handout"
      }, {
        name : "4-3 Handout"
      }, {
        name : "4-3 Handout"
      }, {
        name : "4-3 Handout"
      }, {
        name : "4-3 Handout"
      }, {
        name : "4-3 Handout"
      }, {
        name : "4-3 Handout"
      }, {
        name : "4-3 Homework"
      }]
    }, {
      name : "Physics",
      assignments : [{
        name : "2-1 Review"
      }, {
        name : "2-1 Handout"
      }]
    }]
  };
  $scope.login = function() {
    this.state.loggedin = true
  };
  $scope.logout = function() {
    this.state.loggedin = false
  };
}
