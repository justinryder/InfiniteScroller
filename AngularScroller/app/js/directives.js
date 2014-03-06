'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

angular.module('myApp.directives', []).
  directive('.game', function() {
  return {
		restrict: 'EA',
		replace: 'true',
		transclude: 'true',
		template: 
		  '<div><ul class="clist" ng-transclude></ul>' + 
	    '<a href="" class="clist-up" ng-click="up()">Up</a>' + 
	    '<a href="" class="clist-down" ng-click="down()">Down</a></div>',
		link: function (scope, element, attrs) {
			scope.up = function () {
				alert("UP!");
				console.log("Up");
			}

			scope.down = function () {
				console.log("Down");
			}
            Hamster(element[0]).wheel(function(event, delta, deltaX, deltaY){
                event.preventDefault();
              if(delta>0)
                  scope.down();
              else
                  scope.up();
            });
		}
	}
});