(function(){
    'use strict';
  
    app.config(function($stateProvider, $urlRouterProvider) {
      
      $stateProvider
  
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })

      .state('call', {
        url: '/call',
        templateUrl: 'templates/call.html',
        controller: 'CallListCtrl'
      })

      .state('list', {
        url: '/list/:option',
        templateUrl: 'templates/listCall.html',
        controller: 'CallCtrl'
      })
  
      $urlRouterProvider.otherwise('/');
    });
  })();