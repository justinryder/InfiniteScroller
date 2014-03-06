'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('Resources', {
    images:{
      babies:[
        'img/Baby1.png',
        'img/Baby2.png'
      ],
      floor: 'img/background.png'
    },
    text:{
      gameName:'Baby, Boomer',
      menuLinks:[
        {name:'Play', url:'#/game'},
        {name:'High Scores', url:'#/highscores'},
        {name:'Credits', url:'#/credits'}
      ],
      credits:[
        {name:'Alex Toulan', role:'Sr. Software Development Intern'},
        {name:'Colin Robot-Ham', role:'Lead Artist'},
        {name:'Ellory Ross-Reid', role:'Lead Programmer'},
        {name:'Justin Ryder', role:'Lead Leader'}
      ]
    },
    babyAnimateSpeed: 500,
    gameScreenSize:{
      width:600,
      height:800
    },
    floorLimit:{
      min:50,
      max:650
    },
    gameSpeed: 50,
    scoreSpeed: 1,
    obstacles:[
      {image:'img/obstacle1.jpg', size:{width:64, height:64}},
      {image:'img/obstacle2.jpg', size:{width:64, height:64}},
      {image:'img/obstacle3.png', size:{width:64, height:64}}
    ],
    crawlSpeed:100,
    obstacleSpawnRates:[3000, 5500, 6000, 7000, 7000, 5000, 8000, 4500, 3500]
  });