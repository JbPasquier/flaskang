'use strict';

angular.module('flaskang')
  .controller('DatasController', ['$scope', '$modal', 'resolvedDatas', 'Datas',
    function ($scope, $modal, resolvedDatas, Datas) {

      $scope.datas = resolvedDatas;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.datas = Datas.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Datas.delete({id: id},
          function () {
            $scope.datas = Datas.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Datas.update({id: id}, $scope.datas,
            function () {
              $scope.datas = Datas.query();
              $scope.clear();
            });
        } else {
          Datas.save($scope.datas,
            function () {
              $scope.datas = Datas.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.datas = {
          
          "test": "",
          
          "title": "",
          
          "message": "",
          
          "date": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var datasSave = $modal.open({
          templateUrl: 'datas-save.html',
          controller: 'DatasSaveController',
          resolve: {
            datas: function () {
              return $scope.datas;
            }
          }
        });

        datasSave.result.then(function (entity) {
          $scope.datas = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('DatasSaveController', ['$scope', '$modalInstance', 'datas',
    function ($scope, $modalInstance, datas) {
      $scope.datas = datas;

      
      $scope.dateDateOptions = {
        dateFormat: 'yy-mm-dd',
        
        minDate: 1
      };

      $scope.ok = function () {
        $modalInstance.close($scope.datas);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
