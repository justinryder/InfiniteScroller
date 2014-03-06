'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
  controller('MenuCtrl', ['$scope', 'Resources', function($scope, Resources) {
    $scope.gameName = Resources.text.gameName;
    $scope.links = Resources.text.menuLinks;
  }])

  .controller('GameCtrl', ['$scope', '$document', 'Resources', function($scope, $document, Resources) {
    /* SCORE */
    $scope.score = 0;

    /* FLOOR */
    $scope.floor = new Floor($scope.floorImage, { x: 0, y: 0 }, Resources.crawlSpeed);
    $scope.backgroundStyle = function(){
      return {
        'background-image': 'url(' + Resources.images.floor + ')',
        'background-position': $scope.floor.position.x + 'px ' + $scope.floor.position.y + 'px'
      };
    };

    /* BABY */
    $scope.babyImage = Resources.images.babies[0];
    $scope.babyPosition = {x:500,y:636};
    $scope.moveBaby = function($event) {
        var minX = Resources.floorLimit.min;
        var maxX = Resources.floorLimit.max;
        return $event.pageX < minX ? minX : $event.pageX > maxX ? maxX : $event.pageX;
      };

    var babyImageIndex = 0;
    var babyImageInterval = setInterval(function(){
      $scope.$apply(function(){
        babyImageIndex++;
        if (babyImageIndex > Resources.images.babies.length){
          babyImageIndex = 0;
        }
        $scope.babyImage = Resources.images.babies[babyImageIndex];
      });
    }, Resources.babyAnimateSpeed);

    /* OBSTACLES */
    $scope.obstacles = [];
    $scope.spawnObstacle = function() {
      var resourceObstacle = RandomItem(Resources.obstacles);
      var obstacle = new Obstacle(
        resourceObstacle,
        {x:Random(Resources.floorLimit.max - 64, Resources.floorLimit.min + 64), y:-resourceObstacle.size.height},
        Resources.crawlSpeed);
      $scope.obstacles.push(obstacle);
    };

    var obstacleSpawnManagerInterval;
    function obstacleSpawnManager(){
      obstacleSpawnManagerInterval = setTimeout(function(){
        $scope.$apply(function(){
          $scope.spawnObstacle();
        });
        obstacleSpawnManager();
      }, RandomItem(Resources.obstacleSpawnRates));
    }
    // init the obstacle spawning random loop
    obstacleSpawnManager();

    /* UPDATE */
    var updateInterval = setInterval(function(){
      $scope.$apply(function(){
        var deltaTime = Resources.gameSpeed / 1000;

        $scope.floor.update(deltaTime);

        Enumerable.From($scope.obstacles).ForEach(function(obstacle){
          obstacle.update(deltaTime);
          if (AreColliding(obstacle.position, $scope.babyPosition)){
            $scope.endGame();
          }

          if (obstacle.position.y > Resources.gameScreenSize.height){
            $scope.obstacles.splice($scope.obstacles.indexOf(obstacle), 1);
          }
        });

        $scope.score += Resources.scoreSpeed;
      })
    }, Resources.gameSpeed);

    $scope.endGame = function(){
		var highScores = getHighScores();
		var newScore = prompt("What's your name?") + ':' + $scope.score;
		var newcookieval = readCookie('bb_newScore') + "|" + cookieval;
		createCookie('bb_newScore', newcookieval);
      clearInterval(updateInterval);
      clearInterval(babyImageInterval);
      clearTimeout(obstacleSpawnManagerInterval);
    };
  }])

  .controller('HighScoresCtrl', ['$scope', function($scope){
	var allScores = readCookie('bb_newScore').split('|');
	var highScores = [];
	allScores.forEach(function(scoreItem) {
		highScores.push({name: scoreItem.split(':')[0], score: scoreItem.split(':')[1]});
	});
	highScores.sort(sortHighScores);
	$scope.highScores = highScores;
  }])

  .controller('CreditsCtrl', ['$scope', 'Resources', function($scope, Resources){
    $scope.credits = Resources.text.credits;
    $scope.creditsPosition = Resources.gameScreenSize.height;
    setInterval(function(){
      $scope.$apply(function(){
        var deltaTime = Resources.creditsInterval / 1000;
        $scope.creditsPosition -= Resources.creditsScrollSpeed * deltaTime;
      });
    }, Resources.creditsInterval);
  }]);

function createCookie(name,value) {
	var expires = "; expires=Tue, 19 Jan 2038 03:14:07 GMT;";
	document.cookie = name+"="+value+expires+" path=/";
}
  
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function getHighScores() {
	var cookie = readCookie('bb_newScore').split('|');
	var highScores = [];
	cookie.forEach(function(scoreItem) {
		highScores.push(scoreItem.split(':')[1]);
	});
	highScores.sort(sortNumber);
	console.log(highScores);
	return highScores;
}

function sortNumber(a,b) {
    return b - a;
}

function sortHighScores(a,b) {
    return b.score - a.score;
}
  
function AreColliding(pos1, pos2){
  return Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) < 128;
}

function RandomItem(arr){
  return arr[Random(arr.length)];
}

function Random(max, min){
  min = min || 0;
  return Math.floor((Math.random()*max)+min);
}

function Obstacle(obstacle, position, speed) {
  var self = this;
  self.image = obstacle.image;
  self.size = obstacle.size;
  self.position = position;
  self.update = function(deltaTime){
    position.y += speed * deltaTime;
  };
  self.style = function(){
    return {
      left: -position.x * 0.5,
      top: -position.y * 0.5
    };
  };
  return self;
}

function Floor(image, position, speed) {
  var self = this;
  self.image = image;
  self.position = position;
  self.speed = speed;
  self.update = function(deltaTime){
    position.y += speed * deltaTime;
  };
  return self;
}