'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Who Lying?',
        'link': 'articles'
    },
    {
        'title': 'Got Beef?',
        'link': 'articles/create',
        'roles': ['authenticated']
    }];
    
    $scope.isCollapsed = false;
}]);