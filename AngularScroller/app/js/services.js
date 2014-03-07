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
      highScoreLinks:[
        {name:'Menu', url:'#/menu'}
      ],
      creditsLinks:[
        {name:'Menu', url:'#/menu'}
      ],
      credits:[
        {name:'Alex Toulan', role:'Lead Sr. Software Development Intern'},
        {name:'Colin Koponen-Robotham', role:'Lead Artistic Director'},
        {name:'Ellery Ross-Reid', role:'Lead Programmer'},
        {name:'Justin Ryder', role:'Lead Leader'}
      ]
    },
    creditsScrollSpeed: 50,
    creditsInterval: 50,
    babyAnimateSpeed: 200,
    babySize: 64,
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
      {image:'img/boxes.png', size:{width:64, height:64}},
      {image:'img/pizza.png', size:{width:64, height:64}},
      {image:'img/milk.png', size:{width:64, height:64}},
      {image:'img/Ham.png', size:{width:64, height:64}},
      {image:'img/boxes.png', size:{width:64, height:64}},
      {image:'img/boxes.png', size:{width:64, height:64}},
      {image:'img/boxes.png', size:{width:64, height:64}},
      {image:'img/boxes.png', size:{width:64, height:64}},
      {image:'img/boxes.png', size:{width:64, height:64}}
    ],
    crawlSpeed:100,
    obstacleSpawnRates:[3000, 5500, 5000, 4500, 3500, 2000, 2500]
  });