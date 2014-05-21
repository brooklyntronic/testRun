'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Who\'s Lying?',
        'link': 'articles'
    }];
    
    $scope.isCollapsed = false;
}]);