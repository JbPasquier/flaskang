'use strict';

angular.module('flaskang')
  .factory('Datas', ['$resource', function ($resource) {
    return $resource('flaskang/datas/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
