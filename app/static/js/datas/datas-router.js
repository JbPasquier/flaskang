'use strict';

angular.module('flaskang')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/datas', {
        templateUrl: 'views/datas/datas.html',
        controller: 'DatasController',
        resolve:{
          resolvedDatas: ['Datas', function (Datas) {
            return Datas.query();
          }]
        }
      })
    }]);
