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
      ]
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
    gameSpeed: 50,
    scoreSpeed: 1,
    obstacles:[
      {image:'img/obstacle1.jpg', size:{width:64, height:64}},
      {image:'img/obstacle2.jpg', size:{width:64, height:64}},
      {image:'img/obstacle3.png', size:{width:64, height:64}}
    ],
    obstacleSpeeds:[10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    obstacleSpawnRates:[100, 150, 200, 300, 400, 500, 1000, 1500, 2000]
  });