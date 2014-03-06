'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MenuCtrl', ['$scope', function($scope) {
    $scope.test = "menu bitches";
  }])
  .controller('GameCtrl', ['$scope', function($scope) {
    $scope.test = "game bitches";
  }]);