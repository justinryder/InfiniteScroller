'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('Resources', {
    images:{
      baby:'img/baby.png'
    },
    text:{
      gameName:'Baby, Boomer'
    }
  });
