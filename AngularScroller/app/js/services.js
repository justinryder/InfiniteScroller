'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('Resources', {
    images:{
      baby:'img/PrimitiveBaby.png'
    },
    text:{
      gameName:'Baby, Boomer',
      menuLinks:[
        {name:'Play', url:'#/game'},
        {name:'High Scores', url:'#/highscores'},
        {name:'Credits', url:'#/credits'}
      ],
      credits:[
        {name:'Alex Toulan', role:'Lead Benchwarmer'},
        {name:'Colin Robot-Ham', role:'Lead Artist'},
        {name:'Ellory Ross-Ried', role:'Lead Programmer'},
        {name:'Justin Ryder', role:'Lead Leader'}
      ]
    },
    obstacles:[
      {image:'img/obstacle1.jpg', size:{width:32, height:32}},
      {image:'img/obstacle2.jpg', size:{width:32, height:32}},
      {image:'img/obstacle3.png', size:{width:32, height:32}}
    ]
  });