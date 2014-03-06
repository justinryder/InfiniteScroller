'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MenuCtrl', [function($scope) {
    $scope.test = "menu bitches";
  }])
  .controller('GameCtrl', [function($scope) {
    $scope.test = "game bitches";
  }]);